import React from 'react';

export enum AppID {
  AI_ASSISTANT = 'ai_assistant',
  NOTEPAD = 'notepad',
  CALCULATOR = 'calculator',
  SETTINGS = 'settings',
  VSCODE = 'vscode',
  SPOTIFY = 'spotify',
  MY_COMPUTER = 'my_computer',
  PAINT = 'paint'
}

export interface WindowState {
  id: AppID;
  title: string;
  icon: any; // Lucide icon component
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: React.ReactNode;
}

export interface AppConfig {
  id: AppID;
  title: string;
  icon: any;
  component: React.FC;
  defaultSize: { width: number; height: number };
}

export interface ThemeContextType {
  wallpaper: string;
  setWallpaper: (url: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}