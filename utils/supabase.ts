import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing env.VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.VITE_SUPABASE_ANON_KEY');
}

// Create a singleton Supabase client
let supabaseClient: SupabaseClient | null = null;

/**
 * Get or create the Supabase client instance
 * Uses singleton pattern to ensure only one client is created
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseClient;
};

/**
 * Get the Supabase client (alias for getSupabaseClient)
 * This is the main export for convenience
 */
export const supabase = getSupabaseClient();

/**
 * Helper to check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

