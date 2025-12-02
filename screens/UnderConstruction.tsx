import React from 'react';
import { Wrench, ArrowRight } from 'lucide-react';

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto h-full justify-center">
      <header>
        <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight text-white flex items-center gap-3">
          Under<span className="text-hq-green">.Construction</span>
        </h2>
        <p className="font-mono text-xs md:text-sm text-zinc-500 mt-2">DEVELOPMENT IN PROGRESS</p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Wrench className="w-48 h-48 text-zinc-700" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hq-green to-transparent" />

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 z-10 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-hq-green/50 bg-zinc-950 flex items-center justify-center">
            <Wrench className="w-10 h-10 md:w-12 md:h-12 text-hq-green animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase text-white">
              Coming Soon
            </h3>
            <p className="font-mono text-sm text-zinc-400 max-w-md">
              This feature is currently under development. Check back soon for updates.
            </p>
          </div>

          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest mt-4">
            <div className="w-2 h-2 bg-hq-green rounded-full animate-pulse" />
            <span>DEVELOPMENT IN PROGRESS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;

