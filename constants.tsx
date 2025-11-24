import React from 'react';
import { 
  Bot, 
  StickyNote, 
  Calculator as CalcIcon, 
  Settings as SettingsIcon,
  Code2,
  Music,
  Monitor
} from 'lucide-react';
import { AppID, AppConfig } from './types';
import { GeminiAssistant } from './components/apps/GeminiAssistant';
import { Notepad } from './components/apps/Notepad';
import { Calculator } from './components/apps/Calculator';
import { Settings } from './components/apps/Settings';
import { MyComputer } from './components/apps/MyComputer';

export const INITIAL_WALLPAPER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

export const APP_CONFIGS: Record<AppID, AppConfig> = {
  [AppID.MY_COMPUTER]: {
    id: AppID.MY_COMPUTER,
    title: 'This PC',
    icon: <Monitor className="w-full h-full text-blue-500" />,
    component: MyComputer,
    defaultSize: { width: 900, height: 600 }
  },
  [AppID.AI_ASSISTANT]: {
    id: AppID.AI_ASSISTANT,
    title: 'Copilot',
    icon: <Bot className="w-full h-full text-indigo-500" />,
    component: GeminiAssistant,
    defaultSize: { width: 400, height: 600 }
  },
  [AppID.NOTEPAD]: {
    id: AppID.NOTEPAD,
    title: 'Notepad',
    icon: <StickyNote className="w-full h-full text-blue-400" />,
    component: Notepad,
    defaultSize: { width: 600, height: 400 }
  },
  [AppID.CALCULATOR]: {
    id: AppID.CALCULATOR,
    title: 'Calculator',
    icon: <CalcIcon className="w-full h-full text-orange-500" />,
    component: Calculator,
    defaultSize: { width: 320, height: 480 }
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    icon: <SettingsIcon className="w-full h-full text-slate-500" />,
    component: () => null, // Placeholder, injected with props in App.tsx
    defaultSize: { width: 800, height: 500 }
  },
  [AppID.VSCODE]: {
    id: AppID.VSCODE,
    title: 'VS Code',
    icon: <Code2 className="w-full h-full text-blue-600" />,
    component: () => <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-white">VS Code Placeholder</div>,
    defaultSize: { width: 800, height: 600 }
  },
  [AppID.SPOTIFY]: {
    id: AppID.SPOTIFY,
    title: 'Spotify',
    icon: <Music className="w-full h-full text-green-500" />,
    component: () => <div className="h-full flex items-center justify-center bg-black text-white">Spotify Placeholder</div>,
    defaultSize: { width: 800, height: 600 }
  }
};