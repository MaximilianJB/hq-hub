
import React, { useState } from 'react';
import { MapPin, ArrowRight, Users, Cloud, Clock, Home } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-hq-black text-white font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
           backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
           backgroundSize: '40px 40px',
        }} 
      />

      {/* Left Panel: Map Visualization */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/50">
        
        {/* Stylized Street Map Container */}
        <div className="relative w-full max-w-md aspect-square bg-[#09090b] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl group">
           
           {/* Map Graphics (SVG Streets) */}
           <div className="absolute inset-0 opacity-20">
             <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                {/* Streets */}
                <path d="M-10 100 L410 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-zinc-600" />
                <path d="M-10 250 L410 250" stroke="currentColor" strokeWidth="2" fill="none" className="text-zinc-600" />
                <path d="M100 -10 L100 410" stroke="currentColor" strokeWidth="2" fill="none" className="text-zinc-600" />
                <path d="M280 -10 L280 410" stroke="currentColor" strokeWidth="2" fill="none" className="text-zinc-600" />
                
                {/* Smaller Streets */}
                <path d="M-10 180 L280 180" stroke="currentColor" strokeWidth="1" fill="none" className="text-zinc-700" />
                <path d="M100 320 L410 320" stroke="currentColor" strokeWidth="1" fill="none" className="text-zinc-700" />
                <path d="M180 100 L180 250" stroke="currentColor" strokeWidth="1" fill="none" className="text-zinc-700" />
             </svg>
           </div>

           {/* Location Marker */}
           <div className="absolute top-[35%] left-[45%] flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
             <div className="relative">
                <div className="absolute -inset-4 bg-hq-green/20 rounded-full animate-pulse" />
                <MapPin className="w-8 h-8 text-hq-green relative z-10 fill-hq-green/20" />
             </div>
             <div className="mt-2 bg-zinc-900/90 backdrop-blur px-3 py-1 rounded border border-zinc-700 shadow-lg">
                <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">The HQ</span>
             </div>
           </div>

           {/* Map UI Overlay */}
           <div className="absolute top-4 left-4 bg-black/60 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-hq-green animate-pulse" />
             <span className="font-mono text-[10px] text-zinc-300">LIVE FEED</span>
           </div>

           <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded text-right">
             <div className="font-mono text-[10px] text-zinc-400">LAT: 34.0522° N</div>
             <div className="font-mono text-[10px] text-zinc-400">LNG: 118.2437° W</div>
           </div>
        </div>
      </div>

      {/* Right Panel: Login / Info */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 relative z-10 bg-hq-black">
        <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Header */}
            <div>
                <h1 className="text-5xl md:text-6xl font-sans font-bold uppercase tracking-tighter text-white mb-2">
                    HQ<span className="text-hq-green">.OS</span>
                </h1>
                <p className="text-zinc-400 font-mono text-sm">
                    Residential Operating System v2.4
                </p>
            </div>

            {/* House Dashboard Stats */}
            <div className="grid grid-cols-2 gap-3">
                {/* Weather Widget */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between h-24">
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                        <Cloud className="w-3 h-3" /> External
                    </div>
                    <div>
                        <div className="font-sans text-xl font-bold">72°F</div>
                        <div className="font-mono text-[10px] text-zinc-500">Clear Sky</div>
                    </div>
                </div>

                 {/* Time Widget */}
                 <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between h-24">
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                        <Clock className="w-3 h-3" /> System Time
                    </div>
                    <div>
                        <div className="font-sans text-xl font-bold">
                            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">PST</div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 col-span-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-zinc-800 p-2 rounded-full">
                            <Home className="w-4 h-4 text-hq-blue" />
                         </div>
                         <div>
                             <div className="font-sans font-bold text-sm uppercase">House Status</div>
                             <div className="font-mono text-[10px] text-zinc-500">Lease Active • Rent Paid</div>
                         </div>
                    </div>
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] font-mono text-zinc-500">
                                <Users className="w-3 h-3" />
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Login Action */}
            <div className="pt-6">
                {loading ? (
                    <div className="w-full bg-zinc-900 border border-zinc-800 h-14 flex items-center justify-center gap-3 font-mono text-zinc-400 animate-pulse rounded">
                        <div className="w-4 h-4 border-2 border-hq-green border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs uppercase tracking-widest">Authenticating...</span>
                    </div>
                ) : (
                    <button 
                        onClick={handleEnter}
                        className="group w-full bg-white text-black h-14 font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-between px-6 hover:bg-hq-green transition-all rounded hover:shadow-[0_0_20px_rgba(0,225,255,0.3)]"
                    >
                        <span>Enter Dashboard</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
                <div className="mt-4 text-center">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase">
                        Restricted Access. Residents Only.
                    </span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
