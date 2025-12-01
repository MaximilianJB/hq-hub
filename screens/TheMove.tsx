import React from 'react';
import { EVENTS } from '../constants';
import { MapPin, Users, Plus } from 'lucide-react';

const TheMove: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
          Lobby
        </h2>
        <button className="w-full md:w-auto bg-white text-black font-mono font-bold px-4 py-3 md:py-2 hover:bg-hq-pink hover:text-white transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          ADD EVENT
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {EVENTS.map((event) => (
          <div key={event.id} className="group relative h-56 md:h-64 overflow-hidden border-2 border-zinc-800 hover:border-white transition-colors">
            {/* Background Image with Blur */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${event.bgImage})` }}
            />
            <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm group-hover:backdrop-blur-none group-hover:bg-zinc-950/40 transition-all duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className={`font-mono text-[10px] md:text-xs px-2 py-1 uppercase font-bold text-black
                  ${event.type === 'PARTY' ? 'bg-hq-pink' : event.type === 'SPORTS' ? 'bg-hq-green' : 'bg-hq-blue'}
                `}>
                  {event.type}
                </span>
                <div className="text-right">
                  <div className="font-sans text-2xl md:text-3xl font-bold">{event.time}</div>
                  <div className="font-mono text-xs md:text-sm text-hq-green uppercase">{event.date}</div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-sans font-bold uppercase leading-none mb-2 group-hover:translate-x-2 transition-transform">{event.title}</h3>
                <div className="flex flex-col md:flex-row md:gap-6 font-mono text-xs md:text-sm text-zinc-300 gap-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-hq-pink" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-hq-blue" />
                    {event.attendees} PLAYERS
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guest List Warning */}
      <div className="border border-zinc-800 border-dashed p-4 md:p-6 text-center mt-4 md:mt-8">
         <p className="font-mono text-zinc-500 text-xs md:text-sm">
           ⚠️ HOUSE RULE #4: ADD GUESTS TO THE LOBBY. NO SURPRISE NPCS.
         </p>
      </div>
    </div>
  );
};

export default TheMove;