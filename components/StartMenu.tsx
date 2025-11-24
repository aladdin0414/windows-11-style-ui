import React, { useState } from 'react';
import { Search, Power, ChevronRight, User, StickyNote } from 'lucide-react';
import { AppID } from '../types';
import { APP_CONFIGS } from '../constants';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppID) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  // Filter apps based on search
  const filteredApps = Object.values(APP_CONFIGS).filter(app => 
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-[640px] h-[700px] max-h-[85vh] bg-slate-50/95 dark:bg-[#1f1f1f]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200 z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="p-6 pb-2">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input 
                type="text" 
                placeholder="Search for apps, settings, and documents" 
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#2c2c2c] border border-slate-200 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-800 dark:text-white shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      {/* Pinned Section */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 ml-2">Pinned</h3>
            <button className="flex items-center px-2 py-1 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 rounded shadow-sm border border-slate-200 dark:border-slate-700">
                All apps <ChevronRight className="w-3 h-3 ml-1" />
            </button>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
            {filteredApps.map((app) => (
                <button 
                    key={app.id}
                    onClick={() => { onOpenApp(app.id); onClose(); }}
                    className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition-colors group aspect-square"
                >
                    <div className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform duration-200">
                        {app.icon}
                    </div>
                    <span className="text-xs text-center text-slate-700 dark:text-slate-200 truncate w-full">{app.title}</span>
                </button>
            ))}
        </div>

        {/* Recommended Section */}
        <div className="mt-8 mb-4">
             <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 ml-2 mb-4">Recommended</h3>
             <div className="grid grid-cols-2 gap-4">
                 {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="flex items-center p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition-colors cursor-pointer">
                         <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
                             <StickyNote className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                         </div>
                         <div className="flex flex-col">
                             <span className="text-xs font-medium text-slate-800 dark:text-slate-200">Document_{i}.txt</span>
                             <span className="text-[10px] text-slate-500">Recently opened</span>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-slate-100/50 dark:bg-[#181818]/95 border-t border-slate-200 dark:border-slate-700 px-12 flex items-center justify-between">
          <div className="flex items-center space-x-3 hover:bg-white/50 dark:hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  <User className="w-5 h-5" />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Guest User</span>
          </div>
          <button className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
              <Power className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
      </div>
    </div>
  );
};