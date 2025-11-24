import React from 'react';
import { Monitor, Moon, Sun, Image as ImageIcon } from 'lucide-react';

interface SettingsProps {
  setWallpaper: (url: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const wallpapers = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", // Abstract Gradient
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Fluid Blue
  "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop", // Dark Mountains
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"  // Yosemite
];

export const Settings: React.FC<SettingsProps> = ({ setWallpaper, toggleTheme, isDark }) => {
  return (
    <div className="h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <section className="mb-8">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Personalization</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium">App Theme</h3>
                <p className="text-sm text-slate-500">Select your preferred app mode</p>
              </div>
            </div>
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
           <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium">Background</h3>
                <p className="text-sm text-slate-500">Choose your desktop wallpaper</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {wallpapers.map((url, i) => (
                    <button 
                        key={i}
                        onClick={() => setWallpaper(url)}
                        className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all group"
                    >
                        <img src={url} alt={`Wallpaper ${i+1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </button>
                ))}
            </div>
        </div>
      </section>
      
      <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">System</h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-sm text-slate-500">Windows 11 Web Experience</p>
              <p className="text-xs text-slate-400 mt-1">Version 23H2 (OS Build 22631.3007)</p>
          </div>
      </section>
    </div>
  );
};