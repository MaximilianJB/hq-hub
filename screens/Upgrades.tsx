import React from 'react';
import { UPGRADES } from '../constants';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

const Upgrades: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
       <header>
          <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight text-hq-pink">Build Order</h2>
          <p className="font-mono text-xs md:text-sm text-zinc-500">VOTE WITH YOUR WALLET (OR JUST ARROWS)</p>
       </header>

       <div className="grid grid-cols-1 gap-4">
         {UPGRADES.map((item) => (
           <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 group">
             {/* Voting */}
             <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto bg-zinc-950 p-2 rounded border border-zinc-800">
                <button className="text-zinc-500 hover:text-hq-green transition-colors"><ArrowBigUp className="w-6 h-6 md:w-8 md:h-8" /></button>
                <span className="font-mono font-bold text-lg mx-4 md:mx-0 md:my-1">{item.votes}</span>
                <button className="text-zinc-500 hover:text-red-500 transition-colors"><ArrowBigDown className="w-6 h-6 md:w-8 md:h-8" /></button>
             </div>

             {/* Content */}
             <div className="flex-1 text-center md:text-left w-full">
                <h3 className="text-xl md:text-2xl font-sans font-bold uppercase">{item.title}</h3>
                <div className="flex items-center gap-4 justify-center md:justify-start mt-1">
                   <span className="font-mono text-zinc-400 text-xs md:text-sm">EST. COST: ${item.cost}</span>
                   <span className={`font-mono text-[10px] md:text-xs px-2 py-0.5 text-black font-bold uppercase
                     ${item.status === 'DONE' ? 'bg-hq-green' : 
                       item.status === 'IN_PROGRESS' ? 'bg-hq-blue' : 'bg-zinc-200'}
                   `}>
                     {item.status.replace('_', ' ')}
                   </span>
                </div>
             </div>

             {/* Visual Progress if active */}
             {item.status === 'IN_PROGRESS' && (
               <div className="w-full md:w-1/3">
                 <div className="flex justify-between font-mono text-[10px] md:text-xs text-hq-blue mb-1">
                   <span>FUNDED</span>
                   <span>66%</span>
                 </div>
                 <div className="h-2 bg-zinc-800 w-full overflow-hidden">
                    <div className="h-full bg-hq-blue w-2/3 pattern-stripes" />
                 </div>
               </div>
             )}
           </div>
         ))}
       </div>
    </div>
  );
};

export default Upgrades;