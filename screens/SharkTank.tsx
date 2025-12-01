import React from 'react';
import { POKER_DATA, ROOMMATES } from '../constants';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Crown, Fish } from 'lucide-react';

const SharkTank: React.FC = () => {
  const sortedByBalance = [...ROOMMATES].sort((a, b) => b.balance - a.balance);
  const theDon = sortedByBalance[0];
  const theFish = sortedByBalance[sortedByBalance.length - 1];

  return (
    <div className="h-full flex flex-col gap-6 bg-hq-black">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Don */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-hq-gold/50 p-4 md:p-6 flex items-center gap-4 md:gap-6 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 text-hq-gold/10 transform rotate-12">
             <Crown className="w-24 h-24 md:w-32 md:h-32" />
           </div>
           <img src={theDon.avatar} alt="The Don" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-hq-gold z-10" />
           <div className="z-10">
             <div className="flex items-center gap-2 text-hq-gold font-mono text-xs md:text-sm uppercase mb-1">
               <Crown className="w-4 h-4" /> The Don
             </div>
             <h3 className="text-2xl md:text-3xl font-sans font-bold text-white uppercase">{theDon.name}</h3>
             <div className="text-hq-green font-mono text-lg md:text-xl">+${theDon.balance}</div>
           </div>
        </div>

        {/* The Fish */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 md:p-6 flex items-center gap-4 md:gap-6 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 text-hq-blue/10 transform -rotate-12">
             <Fish className="w-24 h-24 md:w-32 md:h-32" />
           </div>
           <img src={theFish.avatar} alt="The Fish" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-hq-blue z-10 grayscale opacity-70" />
           <div className="z-10">
             <div className="flex items-center gap-2 text-hq-blue font-mono text-xs md:text-sm uppercase mb-1">
               <Fish className="w-4 h-4" /> The Fish
             </div>
             <h3 className="text-2xl md:text-3xl font-sans font-bold text-white uppercase">{theFish.name}</h3>
             <div className="text-red-500 font-mono text-lg md:text-xl">-${Math.abs(theFish.balance)}</div>
           </div>
        </div>
      </div>

      {/* The Graph */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 md:p-6 min-h-[300px] md:min-h-[400px] flex flex-col">
        <h3 className="font-mono text-zinc-500 mb-4 uppercase tracking-widest text-xs md:text-sm">Bankroll History</h3>
        <div className="flex-1 w-full h-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={POKER_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#71717a" fontFamily="monospace" fontSize={10} />
              <YAxis stroke="#71717a" fontFamily="monospace" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#facc15', fontFamily: 'monospace' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="Kyle" stroke="#a3e635" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Matt" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Dave" stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Sarah" stroke="#d946ef" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SharkTank;