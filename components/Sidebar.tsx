
import React from 'react';
import { ScreenName } from '../types';
import { 
  Radar, 
  CalendarDays, 
  Skull, 
  PiggyBank, 
  Hammer, 
  TrendingUp, 
  Receipt,
  Settings
} from 'lucide-react';

interface SidebarProps {
  currentScreen: ScreenName;
  setScreen: (screen: ScreenName) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setScreen }) => {
  const navItems: { id: ScreenName; label: string; icon: React.ReactNode }[] = [
    { id: 'COMMAND', label: 'HQ Command', icon: <Radar className="w-6 h-6" /> },
    { id: 'THE_MOVE', label: 'The Move', icon: <CalendarDays className="w-6 h-6" /> },
    { id: 'THE_GRIND', label: 'The Grind', icon: <Skull className="w-6 h-6" /> },
    { id: 'THE_STASH', label: 'The Stash', icon: <PiggyBank className="w-6 h-6" /> },
    { id: 'UPGRADES', label: 'Upgrades', icon: <Hammer className="w-6 h-6" /> },
    { id: 'SHARK_TANK', label: 'Shark Tank', icon: <TrendingUp className="w-6 h-6" /> },
    { id: 'RECEIPTS', label: 'Receipts', icon: <Receipt className="w-6 h-6" /> },
  ];

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-hq-charcoal border-r border-zinc-800 flex-col z-50">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-3xl font-sans font-bold tracking-tighter text-white">
          HQ<span className="text-hq-green">.OS</span>
        </h1>
        <span className="text-hq-green font-mono text-xs">v1.0.0-STABLE</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 group relative
              ${currentScreen === item.id 
                ? 'text-hq-green bg-zinc-900/50' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
          >
            {currentScreen === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-hq-green shadow-[0_0_10px_#a3e635]" />
            )}
            <div className={`transition-transform duration-300 ${currentScreen === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </div>
            <span className="font-mono text-sm tracking-wider uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="border-t border-zinc-800">
        <button
          onClick={() => setScreen('PROFILE')}
          className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 group relative
            ${currentScreen === 'PROFILE' 
              ? 'text-hq-green bg-zinc-900/50' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
        >
          {currentScreen === 'PROFILE' && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-hq-green shadow-[0_0_10px_#a3e635]" />
          )}
          <div className={`transition-transform duration-300 ${currentScreen === 'PROFILE' ? 'scale-110' : 'group-hover:scale-110'}`}>
            <Settings className="w-6 h-6" />
          </div>
          <span className="font-mono text-sm tracking-wider uppercase">
            System Settings
          </span>
        </button>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-hq-green animate-pulse-fast" />
            <span className="text-xs font-mono text-zinc-500">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
