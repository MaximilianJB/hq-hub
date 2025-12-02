import React, { useState } from 'react';
import { Shield, Clock, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PendingInvitation: React.FC = () => {
  const { signOut, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshProfile();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      // Add a small delay so the user sees the spinner even if the request is instant
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-hq-black text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
           }} 
      />

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl relative group overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Shield className="w-32 h-32 text-zinc-700" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent" />

        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-sans font-bold uppercase tracking-tight text-white mb-2">
            Access Pending
          </h2>
          
          <p className="font-mono text-sm text-zinc-400 mb-8 leading-relaxed">
            Your request to join HQ.OS has been received. <br/>
            An existing roommate must verify your identity before you can access the system.
          </p>

          <div className="w-full bg-zinc-950 border border-zinc-800 p-4 mb-8 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-zinc-500 uppercase">Status</span>
              <span className="font-mono text-xs text-yellow-500 uppercase bg-yellow-500/10 px-2 py-0.5 rounded">Pending Invitation</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500 uppercase">House ID</span>
              <span className="font-mono text-xs text-white">#001</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full bg-zinc-800 text-white font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors uppercase tracking-wider text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> 
              {isRefreshing ? 'Checking...' : 'Check Status'}
            </button>

            <button
              onClick={() => signOut()}
              className="flex items-center justify-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider"
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingInvitation;
