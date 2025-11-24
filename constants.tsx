import React from 'react';
import { 
  Bot, 
  StickyNote, 
  Calculator as CalcIcon, 
  Settings as SettingsIcon,
  Code2,
  Music,
  Monitor,
  LayoutGrid,
  Palette
} from 'lucide-react';
import { AppID, AppConfig } from './types';
import { GeminiAssistant } from './components/apps/GeminiAssistant';
import { Notepad } from './components/apps/Notepad';
import { Calculator } from './components/apps/Calculator';
import { Settings } from './components/apps/Settings';
import { MyComputer } from './components/apps/MyComputer';
import { Paint } from './components/apps/Paint';

export const INITIAL_WALLPAPER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

// Fluent Icon: Uses SVG fill/stroke to create a modern "tinted" look without a container box.
// This mimics the object-oriented design of Windows 11 icons better than iOS-style tiles.
const FluentIcon = ({ icon: Icon, color, fill }: { icon: any, color: string, fill: string }) => (
  <div className="w-full h-full flex items-center justify-center filter drop-shadow-sm transition-transform duration-200 hover:scale-105">
    <Icon 
      className={`w-full h-full ${color} ${fill}`} 
      strokeWidth={1.5}
    />
  </div>
);

export const APP_CONFIGS: Record<AppID, AppConfig> = {
  [AppID.MY_COMPUTER]: {
    id: AppID.MY_COMPUTER,
    title: 'This PC',
    // Blue Monitor
    icon: <FluentIcon icon={Monitor} color="text-blue-600" fill="fill-blue-100" />,
    component: MyComputer,
    defaultSize: { width: 900, height: 600 }
  },
  [AppID.AI_ASSISTANT]: {
    id: AppID.AI_ASSISTANT,
    title: 'Copilot',
    // Indigo Bot
    icon: <FluentIcon icon={Bot} color="text-indigo-600" fill="fill-indigo-100" />,
    component: GeminiAssistant,
    defaultSize: { width: 400, height: 600 }
  },
  [AppID.PAINT]: {
    id: AppID.PAINT,
    title: 'Paint',
    // Rose Palette
    icon: <FluentIcon icon={Palette} color="text-rose-600" fill="fill-rose-100" />,
    component: Paint,
    defaultSize: { width: 800, height: 600 }
  },
  [AppID.NOTEPAD]: {
    id: AppID.NOTEPAD,
    title: 'Notepad',
    // Teal Note
    icon: <FluentIcon icon={StickyNote} color="text-teal-600" fill="fill-teal-100" />,
    component: Notepad,
    defaultSize: { width: 600, height: 400 }
  },
  [AppID.CALCULATOR]: {
    id: AppID.CALCULATOR,
    title: 'Calculator',
    // Orange Calculator
    icon: <FluentIcon icon={CalcIcon} color="text-orange-600" fill="fill-orange-100" />,
    component: Calculator,
    defaultSize: { width: 320, height: 480 }
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    // Slate Gear
    icon: <FluentIcon icon={SettingsIcon} color="text-slate-600" fill="fill-slate-100" />,
    component: () => null, // Placeholder, injected with props in App.tsx
    defaultSize: { width: 800, height: 500 }
  },
  [AppID.VSCODE]: {
    id: AppID.VSCODE,
    title: 'VS Code',
    // Sky Blue Code
    icon: <FluentIcon icon={Code2} color="text-sky-600" fill="fill-sky-100" />,
    component: () => <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-white font-mono">VS Code Placeholder</div>,
    defaultSize: { width: 800, height: 600 }
  },
  [AppID.SPOTIFY]: {
    id: AppID.SPOTIFY,
    title: 'Spotify',
    // Green Music
    icon: <FluentIcon icon={Music} color="text-green-600" fill="fill-green-100" />,
    component: () => <div className="h-full flex items-center justify-center bg-black text-white font-bold">Spotify Placeholder</div>,
    defaultSize: { width: 800, height: 600 }
  }
};