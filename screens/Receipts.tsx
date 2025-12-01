import React from 'react';
import { Quote, Lock } from 'lucide-react';

const PHOTOS = [
  'https://picsum.photos/id/101/300/400',
  'https://picsum.photos/id/103/400/300',
  'https://picsum.photos/id/145/300/300',
  'https://picsum.photos/id/165/300/400',
  'https://picsum.photos/id/177/400/400',
  'https://picsum.photos/id/203/300/300',
];

const Receipts: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Quote Board */}
      <div className="bg-zinc-900 border-2 border-white p-6 md:p-8 relative">
        <Quote className="absolute top-4 left-4 text-zinc-800 w-8 h-8 md:w-12 md:h-12 transform -scale-x-100" />
        <blockquote className="text-center font-sans text-2xl md:text-5xl font-bold uppercase leading-tight relative z-10">
          "I think I can make that jump."
        </blockquote>
        <div className="text-center mt-4 font-mono text-zinc-400 text-sm md:text-base">
          - DAVE, 2:00 AM
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="font-mono text-hq-green uppercase text-sm md:text-base">Clips & Highlights</h3>
        <button className="flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-400">
          <Lock className="w-3 h-3" /> RESTRICTED CONTENT
        </button>
      </div>

      {/* Masonry Layout (Simulated) */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {PHOTOS.map((url, i) => (
          <div key={i} className="break-inside-avoid relative group overflow-hidden border border-zinc-800">
             <img src={url} alt="Memory" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
               <span className="font-mono text-xs text-white">IMG_00{i + 45}.JPG</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Receipts;