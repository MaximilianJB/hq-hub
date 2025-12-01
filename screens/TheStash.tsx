import React from 'react';
import { Plane, Beer } from 'lucide-react';

const TheStash: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Big Goal */}
      <div className="bg-zinc-900 border-2 border-hq-green p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-hq-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <Plane className="text-hq-green w-5 h-5 md:w-6 md:h-6" />
              <span className="font-mono text-hq-green uppercase text-sm md:text-base">Current Objective</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold uppercase text-white mb-2">Spring Break '26</h2>
            <div className="font-mono text-zinc-400 text-xs md:text-sm">CABO SAN LUCAS • $4,000 GOAL</div>
          </div>

          <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
            {/* Simple CSS Circle Chart */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00e1ff" strokeWidth="8" strokeDasharray="283" strokeDashoffset="100" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl md:text-2xl">
              65%
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/50 p-4 border-l-2 border-hq-green flex justify-between md:block">
            <div className="font-sans font-bold uppercase">Kyle</div>
            <div className="font-mono text-xs text-hq-green">100% PAID</div>
          </div>
          <div className="bg-black/50 p-4 border-l-2 border-hq-green flex justify-between md:block">
            <div className="font-sans font-bold uppercase">Dave</div>
            <div className="font-mono text-xs text-hq-green">100% PAID</div>
          </div>
          <div className="bg-black/50 p-4 border-l-2 border-yellow-500 flex justify-between md:block">
            <div className="font-sans font-bold uppercase">Sarah</div>
            <div className="font-mono text-xs text-yellow-500">80% PAID</div>
          </div>
          <div className="bg-black/50 p-4 border-l-2 border-red-500 opacity-70 flex justify-between md:block">
            <div className="font-sans font-bold uppercase">Matt</div>
            <div className="font-mono text-xs text-red-500">40% (SLACKING)</div>
          </div>
        </div>
      </div>

      {/* The Slush Fund */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="bg-zinc-800 p-3 md:p-4 rounded-full">
            <Beer className="w-6 h-6 md:w-8 md:h-8 text-hq-blue" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-sans font-bold uppercase">Item Shop / Fund</h3>
            <p className="font-mono text-zinc-400 text-xs md:text-sm">Essentials (TP, Cups, Ice)</p>
          </div>
        </div>

        <div className="text-right w-full md:w-auto flex flex-col md:block items-end">
          <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">$142.50</div>
          <button className="w-full md:w-auto bg-hq-blue text-white font-sans font-bold uppercase px-6 py-3 md:py-2 hover:bg-white hover:text-black transition-colors">
            Refill
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheStash;