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
      className="flex flex-col items-center justify-start w-24 p-2 rounded-[4px] hover:bg-white/10 hover:backdrop-blur-[2px] border border-transparent hover:border-white/20 transition-all focus:bg-white/20 focus:border-white/30 outline-none group mb-2 gap-1.5"
    >
      <div className="w-12 h-12">
        {config.icon}
      </div>
      <span className="text-xs text-white text-center font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2 px-1 leading-tight tracking-wide select-none">
        {config.title}
      </span>
    </button>
  );
};