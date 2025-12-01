import React from 'react';
import { ROOMMATES, TICKER_ITEMS, BOUNTIES, EVENTS } from '../constants';
import { Music, Crown, Fish, Trophy, CalendarDays, ArrowRight } from 'lucide-react';

const HQCommand: React.FC = () => {
  // Logic for widgets
  const sortedByBalance = [...ROOMMATES].sort((a, b) => b.balance - a.balance);
  const theDon = sortedByBalance[0];
  const theFish = sortedByBalance[sortedByBalance.length - 1];

  const sortedByXP = [...ROOMMATES].sort((a, b) => b.contributionScore - a.contributionScore);
  const xpLeader = sortedByXP[0];

  const topBounties = [...BOUNTIES].sort((a, b) => b.xp - a.xp).slice(0, 3);
  const nextEvent = EVENTS[0];

  return (
    <div className="h-full flex flex-col gap-4 relative">
        {/* Header Section (Compact) */}
        <header className="flex justify-between items-end border-b border-zinc-800 pb-4">
            <div>
                <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight leading-none">
                    Dash<span className="text-hq-green">board</span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-hq-green rounded-full animate-pulse" />
                    <span className="font-mono text-zinc-500 text-xs">ALL SYSTEMS GO</span>
                </div>
            </div>
            <div className="text-right hidden md:block">
                <div className="font-mono text-xs text-zinc-500">SERVER TIME</div>
                <div className="font-sans text-xl font-bold">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        </header>

        {/* Mosaic Grid - Mobile: 2 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 flex-1">
            
            {/* 1. The Don (Poker Leader) */}
            <div className="col-span-1 bg-gradient-to-br from-zinc-900 to-black border border-hq-gold/30 p-3 md:p-4 relative group overflow-hidden flex flex-col justify-between h-32 md:h-auto">
                <div className="absolute top-2 right-2 text-hq-gold/20">
                    <Crown className="w-8 h-8 md:w-12 md:h-12 rotate-12" />
                </div>
                <div className="font-mono text-[10px] md:text-xs text-hq-gold mb-1 uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3" /> The Don
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 relative z-10">
                    <img src={theDon.avatar} alt="The Don" className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-hq-gold object-cover" />
                    <div>
                        <div className="font-sans text-lg md:text-xl font-bold uppercase leading-none">{theDon.name}</div>
                        <div className="font-mono text-hq-green text-xs md:text-sm">+${theDon.balance}</div>
                    </div>
                </div>
            </div>

            {/* 2. The Fish (Poker Loser) */}
            <div className="col-span-1 bg-zinc-900 border border-zinc-800 p-3 md:p-4 relative group overflow-hidden flex flex-col justify-between h-32 md:h-auto">
                <div className="absolute top-2 right-2 text-hq-blue/20">
                    <Fish className="w-8 h-8 md:w-12 md:h-12 -rotate-12" />
                </div>
                <div className="font-mono text-[10px] md:text-xs text-hq-blue mb-1 uppercase tracking-wider flex items-center gap-1">
                    <Fish className="w-3 h-3" /> The Fish
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 relative z-10">
                    <img src={theFish.avatar} alt="The Fish" className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-hq-blue grayscale opacity-80 object-cover" />
                    <div>
                        <div className="font-sans text-lg md:text-xl font-bold uppercase text-zinc-400 leading-none">{theFish.name}</div>
                        <div className="font-mono text-red-500 text-xs md:text-sm">-${Math.abs(theFish.balance)}</div>
                    </div>
                </div>
            </div>

            {/* 3. The Aux (Span 2) */}
            <div className="col-span-2 bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group h-40 md:h-auto">
                 <div className="absolute inset-0 bg-gradient-to-r from-hq-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Music className="w-4 h-4" />
                        <span className="font-mono text-xs uppercase">Now Playing</span>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_,i) => <div key={i} className="w-1 h-4 bg-hq-pink/50 animate-pulse" style={{animationDelay: `${i*0.1}s`}} />)}
                    </div>
                 </div>
                 <div className="flex items-end justify-between z-10 mt-4">
                    <div className="overflow-hidden pr-4">
                        <div className="font-sans text-2xl md:text-4xl font-bold leading-none mb-1 truncate">FEIN</div>
                        <div className="font-mono text-xs text-hq-pink truncate">Travis Scott • Playboi Carti</div>
                    </div>
                    <div className="w-10 h-10 min-w-[40px] rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                        <div className="w-0 h-0 border-l-[6px] border-l-current border-y-[4px] border-y-transparent ml-1" />
                    </div>
                 </div>
            </div>

            {/* 4. XP Leader (MVP) (Span 2) */}
            <div className="col-span-2 bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between relative overflow-hidden h-32 md:h-auto">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-hq-green/10 rounded-full blur-2xl" />
                <div className="z-10">
                    <div className="font-mono text-xs text-hq-green mb-1 uppercase flex items-center gap-1">
                        <Trophy className="w-3 h-3" /> MVP
                    </div>
                    <div className="font-sans text-3xl md:text-4xl font-bold uppercase italic">{xpLeader.name}</div>
                    <div className="font-mono text-[10px] md:text-xs text-zinc-500">SCORE: {xpLeader.contributionScore}</div>
                </div>
                <div className="z-10 text-right">
                     <div className="text-4xl md:text-5xl font-mono font-bold text-white leading-none">#{1}</div>
                     <div className="text-[10px] font-mono text-zinc-400 uppercase">Rank</div>
                </div>
            </div>

            {/* 5. Active Bounties Preview (Span 2 on mobile, 1 on LG) */}
            <div className="col-span-2 lg:col-span-1 bg-zinc-900 border border-zinc-800 p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-zinc-400 uppercase">Quests</span>
                    <span className="text-[10px] bg-hq-pink text-white px-1 rounded font-mono">NEW</span>
                </div>
                <div className="flex-1 space-y-2">
                    {topBounties.map(b => (
                        <div key={b.id} className="flex justify-between items-center group/item cursor-pointer border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                            <span className="font-sans text-sm font-bold truncate group-hover/item:text-hq-pink transition-colors">{b.title}</span>
                            <span className="font-mono text-xs text-hq-green">+{b.xp} XP</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Next Move (Event Preview) (Span 2 on mobile, 1 on LG) */}
            <div className="col-span-2 lg:col-span-1 bg-zinc-900 border border-zinc-800 relative group overflow-hidden min-h-[120px]">
                 <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0" style={{backgroundImage: `url(${nextEvent.bgImage})`}} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-4">
                     <div className="font-mono text-xs text-hq-blue mb-1 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" /> UP NEXT
                     </div>
                     <h3 className="font-sans text-xl font-bold uppercase leading-tight mb-1">{nextEvent.title}</h3>
                     <div className="flex justify-between items-end">
                         <span className="font-mono text-xs text-zinc-300">{nextEvent.time} • {nextEvent.date}</span>
                         <ArrowRight className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                     </div>
                 </div>
            </div>

        </div>

        {/* Footer Ticker */}
        <div className="h-8 bg-zinc-950 border-t border-zinc-800 flex items-center overflow-hidden shrink-0">
            <div className="animate-marquee whitespace-nowrap font-mono text-xs text-zinc-500 uppercase tracking-widest">
                {TICKER_ITEMS.join(" /// ")} /// {TICKER_ITEMS.join(" /// ")}
            </div>
        </div>
    </div>
  );
};

export default HQCommand;