
import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Users, Cloud, Clock, Home, Sun, Moon, CloudRain, Snowflake } from 'lucide-react';
import { fetchWeather, WeatherData } from '../utils/weather';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeather();
  }, []);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-hq-black text-white font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
           backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
           backgroundSize: '40px 40px',
        }} 
      />

      {/* Left Panel: House Outline */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/50">
        
        {/* House Outline Container */}
        <div className="relative w-full max-w-md aspect-square bg-[#09090b] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl group">
           
           {/* House Outline */}
           <div className="absolute inset-0">
             <img src="/HouseOutline.png" alt="Map" className="w-full h-full object-cover" />
           </div>

           {/* LAT/LNG Overlay */}
           <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded text-right">
             <div className="font-mono text-[10px] text-zinc-400">LAT: 41.6059° N</div>
             <div className="font-mono text-[10px] text-zinc-400">LNG: -93.6967° W</div>
           </div>
        </div>
      </div>

      {/* Right Panel: Login / Info */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 relative z-10 bg-hq-black">
        <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Header */}
            <div>
                <h1 className="text-5xl md:text-6xl font-sans font-bold uppercase tracking-tighter text-white mb-2">
                    HQ<span className="text-hq-green">.OS</span>
                </h1>
                <p className="text-zinc-400 font-mono text-sm">
                    Residential Operating System v1.0
                </p>
            </div>

            {/* House Dashboard Stats */}
            <div className="grid grid-cols-2 gap-3">
                {/* Weather Widget */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between h-24">
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                        <Cloud className="w-3 h-3" /> External
                    </div>
                    <div>
                        {weatherLoading ? (
                            <div className="font-sans text-xl font-bold text-zinc-600">Loading...</div>
                        ) : weather ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="font-sans text-xl font-bold">
                                        {Math.round(weather.current.temperature_2m)}°F
                                    </div>
                                    {weather.current.is_day === 1 ? (
                                        <Sun className="w-4 h-4 text-yellow-400" />
                                    ) : (
                                        <Moon className="w-4 h-4 text-blue-300" />
                                    )}
                                    {(weather.current.rain > 0 || weather.current.showers > 0) && (
                                        <CloudRain className="w-4 h-4 text-blue-400" />
                                    )}
                                    {weather.current.snowfall > 0 && (
                                        <Snowflake className="w-4 h-4 text-cyan-300" />
                                    )}
                                </div>
                                <div className="font-mono text-[10px] text-zinc-500">
                                    {weather.current.rain > 0 || weather.current.showers > 0
                                        ? 'Rain'
                                        : weather.current.snowfall > 0
                                        ? 'Snow'
                                        : 'Clear Sky'}
                                </div>
                            </>
                        ) : (
                            <div className="font-sans text-xl font-bold text-zinc-600">Error</div>
                        )}
                    </div>
                </div>

                 {/* Time Widget */}
                 <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between h-24">
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                        <Clock className="w-3 h-3" /> System Time
                    </div>
                    <div>
                        <div className="font-sans text-xl font-bold">
                            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">CST</div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 col-span-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-zinc-800 p-2 rounded-full">
                            <Home className="w-4 h-4 text-hq-green" />
                         </div>
                         <div>
                             <div className="font-sans font-bold text-sm uppercase">1508 57th PL</div>
                             <div className="font-mono text-[10px] text-zinc-500">Des Moines, IA</div>
                         </div>
                    </div>
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] font-mono text-zinc-500">
                                <Users className="w-3 h-3" />
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Login Action */}
            <div className="pt-6">
                {loading ? (
                    <div className="w-full bg-zinc-900 border border-zinc-800 h-14 flex items-center justify-center gap-3 font-mono text-zinc-400 animate-pulse rounded">
                        <div className="w-4 h-4 border-2 border-hq-green border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs uppercase tracking-widest">Authenticating...</span>
                    </div>
                ) : (
                    <button 
                        onClick={handleEnter}
                        className="group w-full bg-white text-black h-14 font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-between px-6 hover:bg-hq-green transition-all rounded hover:shadow-[0_0_20px_rgba(0,225,255,0.3)]"
                    >
                        <span>Enter Dashboard</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
                <div className="mt-4 text-center">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase">
                        Restricted Access. Residents Only.
                    </span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
