import React, { useState, useCallback } from 'react';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopIcon } from './components/DesktopIcon';
import { Window } from './components/Window';
import { Settings } from './components/apps/Settings';
import { AppID, WindowState } from './types';
import { APP_CONFIGS, INITIAL_WALLPAPER } from './constants';

const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(INITIAL_WALLPAPER);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const openApp = useCallback((appId: AppID) => {
    setWindows((prev) => {
      // If already open, just focus
      if (prev[appId]) {
        if (prev[appId].isMinimized) {
           return {
               ...prev,
               [appId]: { ...prev[appId], isMinimized: false, zIndex: maxZIndex + 1 }
           };
        }
        return {
             ...prev,
            [appId]: { ...prev[appId], zIndex: maxZIndex + 1 }
        };
      }

      // Open new
      const config = APP_CONFIGS[appId];
      // Inject props for Settings app specifically
      let content = <config.component />;
      if (appId === AppID.SETTINGS) {
          content = <Settings setWallpaper={setWallpaper} isDark={isDark} toggleTheme={toggleTheme} />;
      }

      // Center initial position logic
      const initX = Math.max(0, (window.innerWidth - config.defaultSize.width) / 2) + Object.keys(prev).length * 20;
      const initY = Math.max(0, (window.innerHeight - config.defaultSize.height) / 2) + Object.keys(prev).length * 20;

      return {
        ...prev,
        [appId]: {
          id: appId,
          title: config.title,
          icon: config.icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZIndex + 1,
          position: { x: initX, y: initY },
          size: config.defaultSize,
          content: content
        }
      };
    });
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(appId);
    setIsStartOpen(false);
  }, [maxZIndex, isDark]);

  const closeWindow = (id: string) => {
    setWindows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, zIndex: maxZIndex + 1 }
    }));
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const focusWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1 }
    }));
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(id);
    setIsStartOpen(false);
  };

  const updateWindowPosition = (id: string, pos: { x: number; y: number }) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], position: pos }
    }));
  };
  
  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(prev => ({
        ...prev,
        [id]: { ...prev[id], size: size }
    }));
  };

  const toggleStart = () => {
    setIsStartOpen(!isStartOpen);
  };

  // Handle taskbar click (minimize/restore)
  const handleTaskbarAppClick = (id: AppID) => {
      if (windows[id]) {
          if (activeWindowId === id && !windows[id].isMinimized) {
              minimizeWindow(id);
          } else {
              focusWindow(id);
              if (windows[id].isMinimized) {
                   setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: false } }));
              }
          }
      } else {
          openApp(id);
      }
  };

  return (
    <div 
        className={`relative w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat selection:bg-blue-500/30 ${isDark ? 'dark' : ''}`}
        style={{ backgroundImage: `url(${wallpaper})` }}
        onClick={() => { if (isStartOpen) setIsStartOpen(false); }}
    >
      {/* Desktop Icons Area */}
      <div className="absolute top-0 left-0 p-2 flex flex-col flex-wrap h-[calc(100%-48px)] items-start content-start gap-1 z-0">
        <DesktopIcon appId={AppID.MY_COMPUTER} onClick={openApp} />
        <DesktopIcon appId={AppID.AI_ASSISTANT} onClick={openApp} />
        <DesktopIcon appId={AppID.NOTEPAD} onClick={openApp} />
        <DesktopIcon appId={AppID.CALCULATOR} onClick={openApp} />
        <DesktopIcon appId={AppID.SETTINGS} onClick={openApp} />
      </div>

      {/* Windows Layer */}
      {(Object.values(windows) as WindowState[]).map(win => (
        <Window 
          key={win.id}
          window={win}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          updatePosition={(pos) => updateWindowPosition(win.id, pos)}
          updateSize={(size) => updateWindowSize(win.id, size)}
        />
      ))}

      {/* UI Layer */}
      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)} 
        onOpenApp={openApp} 
      />
      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId}
        isStartOpen={isStartOpen}
        toggleStart={toggleStart}
        onAppClick={handleTaskbarAppClick}
      />
    </div>
  );
};

export default App;