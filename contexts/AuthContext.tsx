import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { UserProfile, HouseRoommate } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  houseState: 'PENDING INVITATION' | 'ROOMATE' | null;
  loading: boolean;
  needsOnboarding: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [houseState, setHouseState] = useState<'PENDING INVITATION' | 'ROOMATE' | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      // Parallel fetch for speed and independence
      const [houseResponse, profileResponse] = await Promise.all([
        supabase
          .from('house_roomates')
          .select('state')
          .eq('user_id', userId)
          .eq('house_id', 1)
          .maybeSingle(),
        supabase
          .from('user')
          .select('*')
          .eq('id', userId)
          .single()
      ]);

      const houseData = houseResponse.data;
      const profileData = profileResponse.data;

      // Update State
      if (houseData) {
        setHouseState(houseData.state as 'PENDING INVITATION' | 'ROOMATE');
      } else {
        setHouseState(null);
      }

      if (profileData) {
        setUserProfile(profileData as UserProfile);
      }

      // Logic: If they have a house state (Pending/Roommate), they are onboarded.
      // If they have a profile but no house state, they might need to rejoin or it's a glitch, 
      // but for now let's assume if EITHER exists, they are past the raw "New User" stage.
      // Strictly speaking, Onboarding creates both. 
      // If only House exists (RLS hiding profile), we skip onboarding to show Pending screen.
      
      if (!houseData && !profileData) {
        console.log('No profile or house link found, triggering onboarding.');
        setNeedsOnboarding(true);
      } else {
        setNeedsOnboarding(false);
      }

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        const currentUser = session?.user ?? null;
        
        // If we get a SIGNED_OUT event, clear everything immediately
        if (event === 'SIGNED_OUT') {
           setUser(null);
           setUserProfile(null);
           setHouseState(null);
           setNeedsOnboarding(false);
           setLoading(false);
           return;
        }

        setUser(currentUser);
        setLoading(false); 

        if (currentUser) {
            // Optimization: Only fetch if we don't have a profile or the ID doesn't match
            // We use a simpler check here to avoid stale state issues on re-login
            if (!userProfile || userProfile.id !== currentUser.id) {
               await fetchProfile(currentUser.id);
            }
        } else {
          setUserProfile(null);
          setHouseState(null);
          setNeedsOnboarding(false);
        }

        // Handle OAuth callback
        if (event === 'SIGNED_IN') {
          // Clear URL hash/params after successful sign-in
          if (window.location.hash || window.location.search) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`,
        },
      });

      if (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    
    // 1. Immediately clear local state to update UI
    setUser(null);
    setUserProfile(null);
    setHouseState(null);
    setNeedsOnboarding(false);

    try {
      // 2. Perform Supabase signout (even if it hangs, UI is already updated)
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        // We don't throw here because we want to prioritize the local logout experience
      }
      console.log('Sign out complete');
    } catch (error) {
      console.error('Sign out error:', error);
      // Suppress error to ensure UI remains in logged-out state
    }
  };

  const completeOnboarding = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    // Double check authentication state before proceeding
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error('No active session found during onboarding.');
    }

    const newProfile = {
      id: user.id,
      email: user.email!,
      ...data
    };

    try {
      // 1. Try to UPDATE first
      // This helps with RLS policies that might restrict UPDATEs if the row doesn't exist
      // or restricts INSERTs if the row DOES exist (which causes duplication errors)
      const { data: updatedUser, error: updateError } = await supabase
        .from('user')
        .update(newProfile)
        .eq('id', user.id)
        .select();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        // Fallthrough to try insert if update failed
      }

      // If no row updated, try INSERT
      if (!updatedUser || updatedUser.length === 0) {
        const { error: insertError } = await supabase
          .from('user')
          .insert([newProfile]);
          
        if (insertError) {
          // If insert also fails (e.g. duplicate key that update missed?), throw
          if (insertError.code === '23505') {
             console.log('User profile already exists (race condition), proceeding.');
          } else {
             console.error('Error creating profile (insert):', insertError);
             throw insertError;
          }
        }
      }

      // 2. Create House Roommate Link
      // Use standard INSERT instead of upsert to avoid RLS confusion.
      // If it fails with duplicate key (23505), we ignore it.
      const { error: houseError } = await supabase
        .from('house_roomates')
        .insert([{
          house_id: 1,
          user_id: user.id,
          state: 'PENDING INVITATION'
        }]);

      if (houseError) {
        // 23505 = duplicate key violation (unique_violation)
        if (houseError.code === '23505') {
           console.log('User already linked to house, proceeding.');
        } else {
           console.error('Error creating house link:', houseError);
           throw houseError;
        }
      }

      setUserProfile(newProfile as UserProfile);
      setHouseState('PENDING INVITATION');
      setNeedsOnboarding(false);
    } catch (error) {
      console.error('Onboarding error:', error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    houseState,
    loading,
    needsOnboarding,
    signIn,
    signOut,
    completeOnboarding,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
