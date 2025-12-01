import React from 'react';
import { BOUNTIES, ROOMMATES } from '../constants';
import { CheckCircle2, DollarSign, Trophy } from 'lucide-react';

const TheGrind: React.FC = () => {
  const sortedRoommates = [...ROOMMATES].sort((a, b) => b.contributionScore - a.contributionScore);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Active Bounties Column (First on Mobile, First on Desktop) */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-sans font-bold uppercase flex items-center gap-3">
          Quest Board <span className="text-xs md:text-sm font-mono text-hq-green border border-hq-green px-2 py-1 rounded">LIVE</span>
        </h2>

        <div className="space-y-3 md:space-y-4">
          {BOUNTIES.map((bounty) => (
            <div key={bounty.id} className="bg-zinc-900 border-l-4 border-hq-pink p-4 flex justify-between items-center group hover:bg-zinc-800 transition-colors">
              <div className="pr-2">
                <h3 className="font-bold text-base md:text-xl uppercase font-sans mb-1">{bounty.title}</h3>
                <span className="font-mono text-[10px] md:text-xs text-zinc-500">REWARD: +{bounty.xp} XP</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="p-2 border border-zinc-700 hover:bg-hq-green hover:text-black hover:border-hq-green transition-colors" title="Complete">
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 border border-zinc-700 hover:bg-hq-pink hover:text-white hover:border-hq-pink transition-colors" 
                  title="Buy Out ($10)"
                  onClick={() => alert(`Paid $10 to skip ${bounty.title}`)}
                >
                  <DollarSign className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Column (Second on Mobile) */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 md:p-8 flex flex-col h-fit lg:h-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-mono font-bold uppercase text-hq-gold">Leaderboard</h3>
          <Trophy className="w-5 h-5 md:w-6 md:h-6 text-hq-gold" />
        </div>

        <div className="space-y-4">
          {sortedRoommates.map((mate, index) => (
            <div key={mate.id} className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`font-mono text-lg font-bold w-6 ${index === 0 ? 'text-hq-gold' : 'text-zinc-500'}`}>
                  #{index + 1}
                </div>
                <img src={mate.avatar} alt={mate.name} className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
                <div>
                  <div className="font-sans font-bold uppercase flex items-center gap-2 text-sm">
                    {mate.name}
                    {index === sortedRoommates.length - 1 && (
                      <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-mono">L</span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">LVL {Math.floor(mate.contributionScore / 100)}</div>
                </div>
              </div>
              <div className="font-mono text-hq-green text-base md:text-xl font-bold">
                {mate.contributionScore} XP
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-auto pt-4 text-center font-mono text-[10px] md:text-xs text-zinc-600 uppercase border-t border-zinc-800/50">
          Season ends in 12 days
        </div>
      </div>
    </div>
  );
};

export default TheGrind;