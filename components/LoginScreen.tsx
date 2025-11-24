import React, { useState, useEffect } from 'react';
import { User, Wifi, Battery, Accessibility } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  wallpaper: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, wallpaper }) => {
  const [locked, setLocked] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format: "10:42"
  const timeStr = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false });
  // Format: "Monday, January 1"
  const dateStr = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const handleUnlock = () => {
    setLocked(false);
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center overflow-hidden transition-all duration-700 select-none z-[9999]"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={() => locked && handleUnlock()}
      onKeyDown={(e) => { if(e.key === 'Enter') locked ? handleUnlock() : onLogin() }}
      tabIndex={0}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 bg-black/10 transition-all duration-1000 ${!locked ? 'backdrop-blur-xl bg-black/40' : ''}`} />

      {/* Lock Screen Content */}
      <div 
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center pt-24 text-white transition-all duration-700 transform ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!locked ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="text-8xl font-semibold tracking-tighter drop-shadow-md mb-2 font-[Segoe UI]">{timeStr}</div>
        <div className="text-2xl font-medium drop-shadow-md">{dateStr}</div>
      </div>

      {/* Login Content */}
      <div 
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 delay-200 ${locked ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-6 shadow-xl overflow-hidden border-4 border-white/20">
                <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                     <User className="w-16 h-16 text-white" />
                </div>
            </div>
            <h2 className="text-2xl text-white font-semibold mb-8 tracking-wide">Guest User</h2>
            
            <button 
                onClick={onLogin}
                className="px-8 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-[4px] border border-white/10 backdrop-blur-md shadow-lg transition-all active:scale-95 text-sm font-medium flex items-center justify-center w-32"
            >
                Sign In
            </button>
            
            <div className="mt-8 flex items-center space-x-2 text-white/60 text-xs hover:text-white cursor-pointer transition-colors">
                <span>Sign-in options</span>
            </div>
        </div>
      </div>
      
      {/* Bottom Right Icons */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-6 text-white cursor-default">
          <Wifi className="w-6 h-6 drop-shadow-md" />
          <Accessibility className="w-6 h-6 drop-shadow-md" />
          <Battery className="w-6 h-6 drop-shadow-md" />
      </div>
    </div>
  );
};