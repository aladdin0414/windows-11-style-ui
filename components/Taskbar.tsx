import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Volume2, Battery, ChevronUp, Power, Settings, Activity } from 'lucide-react';
import { AppID, WindowState } from '../types';
import { APP_CONFIGS } from '../constants';

interface TaskbarProps {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  isStartOpen: boolean;
  toggleStart: () => void;
  onAppClick: (id: AppID) => void;
  onLogout: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, activeWindowId, isStartOpen, toggleStart, onAppClick, onLogout
}) => {
  const [time, setTime] = useState(new Date());
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      const handleClickOutside = () => setContextMenuOpen(false);
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenuOpen(true);
  };

  // Pinned apps + open apps
  const pinnedApps = [AppID.AI_ASSISTANT, AppID.PAINT, AppID.SETTINGS, AppID.NOTEPAD, AppID.CALCULATOR, AppID.VSCODE];
  // Deduplicate: If an app is pinned, show it. If it's open but not pinned, show it too.
  const appIds = Array.from(new Set([...pinnedApps, ...Object.keys(windows) as AppID[]]));

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-[#f3f3f3]/85 dark:bg-[#202020]/85 backdrop-blur-xl border-t border-slate-300 dark:border-slate-600 flex justify-between items-center px-2 z-[1000]">
      {/* Invisible spacer to center the icons */}
      <div className="flex-1"></div>

      {/* Center Icons */}
      <div className="flex items-center space-x-1 h-full relative">
        {/* Start Button & Context Menu */}
        <div className="relative">
            <button 
                ref={startButtonRef}
                onClick={toggleStart}
                onContextMenu={handleContextMenu}
                className={`p-2 rounded hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-200 active:scale-95 ${isStartOpen || contextMenuOpen ? 'bg-white/40 dark:bg-white/10' : ''}`}
            >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M4 4h7v7H4V4zm8 0h8v7h-8V4zM4 12h7v8H4v-8zm8 0h8v8h-8v-8z" className="text-blue-500" />
                </svg>
            </button>
            
            {/* Context Menu */}
            {contextMenuOpen && (
                 <div className="absolute bottom-12 left-0 w-56 bg-[#f9f9f9]/95 dark:bg-[#2c2c2c]/95 backdrop-blur-xl border border-slate-300 dark:border-slate-600 rounded-lg shadow-xl py-1.5 z-[2000] text-slate-800 dark:text-slate-100 text-xs animate-in fade-in slide-in-from-bottom-2 duration-100 origin-bottom-left">
                    <div className="px-3 py-2.5 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3">
                         <Settings className="w-4 h-4 text-slate-500" />
                         <span>Taskbar settings</span>
                    </div>
                    <div className="px-3 py-2.5 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer flex items-center gap-3">
                         <Activity className="w-4 h-4 text-slate-500" />
                         <span>Task Manager</span>
                    </div>
                    <div className="h-[1px] bg-slate-200 dark:bg-slate-600 my-1 mx-0"></div>
                    <div 
                        className="px-3 py-2.5 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer flex items-center gap-3 text-red-600 dark:text-red-400"
                        onClick={(e) => { e.stopPropagation(); onLogout(); }}
                    >
                         <Power className="w-4 h-4" />
                         <span>Sign out</span>
                    </div>
                 </div>
            )}
        </div>

        {appIds.map((appId) => {
           const isOpen = windows[appId]?.isOpen;
           const isActive = activeWindowId === appId;
           const config = APP_CONFIGS[appId];

           return (
             <button
               key={appId}
               onClick={() => onAppClick(appId)}
               className={`group relative p-2.5 rounded hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-200 active:scale-95 flex items-center justify-center ${isActive ? 'bg-white/40 dark:bg-white/10' : ''}`}
             >
               <div className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1">
                 {config.icon}
               </div>
               {/* Active Indicator Line */}
               {isOpen && (
                   <div className={`absolute bottom-0.5 w-1.5 h-1 rounded-full bg-slate-400 transition-all duration-300 ${isActive ? 'w-4 bg-blue-500' : ''}`} />
               )}
             </button>
           );
        })}
      </div>

      {/* Right Tray */}
      <div className="flex-1 flex justify-end items-center h-full space-x-2">
         <div className="flex items-center space-x-1 px-2 py-1 hover:bg-white/40 dark:hover:bg-white/10 rounded transition-colors cursor-default">
             <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
         </div>
         
         <div className="flex items-center space-x-3 px-2 py-1 hover:bg-white/40 dark:hover:bg-white/10 rounded transition-colors cursor-default">
             <Wifi className="w-4 h-4 text-slate-600 dark:text-slate-300" />
             <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
             <Battery className="w-4 h-4 text-slate-600 dark:text-slate-300" />
         </div>

         <div className="flex flex-col items-end justify-center px-2 py-1 hover:bg-white/40 dark:hover:bg-white/10 rounded transition-colors cursor-default min-w-[70px]">
             <span className="text-xs text-slate-800 dark:text-slate-100 font-medium leading-none">{formatTime(time)}</span>
             <span className="text-[10px] text-slate-600 dark:text-slate-300 leading-none mt-1">{formatDate(time)}</span>
         </div>
         
         {/* Show Desktop Nudge */}
         <div className="w-1.5 h-full border-l border-slate-300 dark:border-slate-600 ml-2 opacity-50 hover:opacity-100 cursor-pointer"></div>
      </div>
    </div>
  );
};