
import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';
import { 
  Radar, 
  CalendarDays, 
  Skull, 
  PiggyBank, 
  Hammer, 
  TrendingUp, 
  Receipt,
  Menu,
  X,
  Settings
} from 'lucide-react';

interface MobileNavProps {
  currentScreen: ScreenName;
  setScreen: (screen: ScreenName) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentScreen, setScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems: { id: ScreenName; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'COMMAND', label: 'HQ Command', icon: <Radar className="w-5 h-5" />, color: 'text-hq-green' },
    { id: 'THE_MOVE', label: 'The Move', icon: <CalendarDays className="w-5 h-5" />, color: 'text-hq-blue' },
    { id: 'THE_GRIND', label: 'The Grind', icon: <Skull className="w-5 h-5" />, color: 'text-hq-pink' },
    { id: 'THE_STASH', label: 'The Stash', icon: <PiggyBank className="w-5 h-5" />, color: 'text-hq-gold' },
    { id: 'UPGRADES', label: 'Upgrades', icon: <Hammer className="w-5 h-5" />, color: 'text-white' },
    { id: 'SHARK_TANK', label: 'Shark Tank', icon: <TrendingUp className="w-5 h-5" />, color: 'text-red-500' },
    { id: 'RECEIPTS', label: 'Receipts', icon: <Receipt className="w-5 h-5" />, color: 'text-zinc-400' },
    { id: 'PROFILE', label: 'System Settings', icon: <Settings className="w-5 h-5" />, color: 'text-zinc-200' },
  ];

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleSelect = (id: ScreenName) => {
    setScreen(id);
    toggleMenu();
  };

  return (
    <>
      {/* Floating Action Button Trigger */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-hq-charcoal border-2 border-hq-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 transition-transform hover:scale-105"
      >
        {isOpen ? <X className="text-hq-green w-6 h-6" /> : <Menu className="text-hq-green w-6 h-6" />}
      </button>

      {/* Full Screen Vertical Menu Overlay */}
      {(isOpen || isAnimating) && (
        <div 
          className={`md:hidden fixed inset-0 z-[55] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen && !isAnimating ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu}
        >
          <div className="w-full max-w-sm px-6 flex flex-col gap-3 max-h-[85vh] overflow-y-auto no-scrollbar py-4">
            
            {/* Menu Header */}
            <div className={`text-center mb-6 transition-all duration-500 transform ${isOpen && !isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <div className="font-sans text-3xl font-bold uppercase tracking-tighter text-white">
                  HQ<span className="text-hq-green">.OS</span>
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Select Protocol</div>
            </div>

            {/* Menu Items */}
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item.id);
                }}
                className={`
                  relative overflow-hidden w-full flex items-center gap-4 p-4 rounded-lg
                  border transition-all duration-300 group
                  ${currentScreen === item.id 
                    ? 'bg-zinc-900 border-hq-green shadow-[0_0_15px_rgba(163,230,53,0.15)]' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-600'}
                  ${isOpen && !isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                `}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {/* Icon */}
                <div className={`${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col items-start">
                  <span className={`font-mono text-sm uppercase tracking-wider ${currentScreen === item.id ? 'text-white font-bold' : 'text-zinc-300 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </div>

                {/* Active Indicator */}
                {currentScreen === item.id && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-hq-green shadow-[0_0_8px_#a3e635] animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
