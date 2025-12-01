
import React, { useState } from 'react';
import { ScreenName } from './types';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import HQCommand from './screens/HQCommand';
import TheMove from './screens/TheMove';
import TheGrind from './screens/TheGrind';
import TheStash from './screens/TheStash';
import Upgrades from './screens/Upgrades';
import SharkTank from './screens/SharkTank';
import Receipts from './screens/Receipts';
import Profile from './screens/Profile';
import Login from './screens/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('COMMAND');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('COMMAND');
  };

  // If not logged in, show the Login Screen
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Determine which screen component to render
  const renderScreen = () => {
    switch (currentScreen) {
      case 'COMMAND': return <HQCommand />;
      case 'THE_MOVE': return <TheMove />;
      case 'THE_GRIND': return <TheGrind />;
      case 'THE_STASH': return <TheStash />;
      case 'UPGRADES': return <Upgrades />;
      case 'SHARK_TANK': return <SharkTank />;
      case 'RECEIPTS': return <Receipts />;
      case 'PROFILE': 
        // Pass logout handler to Profile if needed, or handle it via context in a larger app
        // For now, we can modify Profile to accept a logout prop, 
        // OR simpler: wrapper component. 
        // Let's modify the props passed to Profile or cloneElement
        // But Profile.tsx currently doesn't accept props. 
        // We will just render it, and assume the button inside does nothing 
        // UNLESS we pass the prop.
        // Let's pass it implicitly for now or just let the button in Profile be visual 
        // UNLESS I update Profile.tsx. 
        // Actually, let's just pass a prop to Profile for logout.
        return <Profile onLogout={handleLogout} />;
      default: return <HQCommand />;
    }
  };

  return (
    <div className="min-h-screen bg-hq-black text-white font-sans flex overflow-hidden selection:bg-hq-green selection:text-black">
      {/* Desktop Sidebar */}
      <Sidebar currentScreen={currentScreen} setScreen={setCurrentScreen} />
      
      {/* Mobile Radial Menu */}
      <MobileNav currentScreen={currentScreen} setScreen={setCurrentScreen} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 ml-0 h-screen overflow-y-auto relative pb-24 md:pb-0 transition-all duration-300">
        {/* Background Grid Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
               backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
             }} 
        />
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden p-4 border-b border-zinc-800 flex justify-between items-center bg-hq-charcoal/80 backdrop-blur sticky top-0 z-40">
           <h1 className="text-2xl font-sans font-bold tracking-tighter text-white">
            HQ<span className="text-hq-green">.OS</span>
           </h1>
           <span className="text-hq-green font-mono text-xs border border-hq-green/30 px-2 py-0.5 rounded">
              {currentScreen.replace('_', ' ')}
           </span>
        </div>
        
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 relative z-10 h-full">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}
