import React from 'react';
import { AppID } from '../types';
import { APP_CONFIGS } from '../constants';

interface DesktopIconProps {
  appId: AppID;
  onClick: (id: AppID) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ appId, onClick }) => {
  const config = APP_CONFIGS[appId];

  return (
    <button
      onClick={() => onClick(appId)}
      className="flex flex-col items-center justify-center w-24 p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/20 transition-all focus:bg-white/20 focus:border-white/30 outline-none group mb-2"
    >
      <div className="w-10 h-10 mb-1 drop-shadow-lg filter">
        {config.icon}
      </div>
      <span className="text-xs text-white text-center font-medium drop-shadow-md line-clamp-2 px-1 rounded group-hover:text-shadow">
        {config.title}
      </span>
    </button>
  );
};