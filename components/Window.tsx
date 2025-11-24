import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  updatePosition: (pos: { x: number; y: number }) => void;
  updateSize: (size: { width: number; height: number }) => void;
}

export const Window: React.FC<WindowProps> = ({ 
  window, onClose, onMinimize, onMaximize, onFocus, updatePosition, updateSize 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging && !window.isMaximized) {
        updatePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, dragOffset, updatePosition, window.isMaximized]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (window.isMaximized) return;
    onFocus();
    setIsDragging(true);
    // Calculate offset from the top-left corner of the window
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  if (!window.isOpen || window.isMinimized) return null;

  // Simple maximization style logic
  const style = window.isMaximized ? {
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 48px)', // Subtract taskbar height
    borderRadius: 0,
    transform: 'none'
  } : {
    top: window.position.y,
    left: window.position.x,
    width: window.size.width,
    height: window.size.height,
  };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800
        ${window.isMaximized ? '' : 'rounded-lg'} transition-opacity duration-200`}
      style={{
        ...style,
        zIndex: window.zIndex,
      }}
      onPointerDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className="h-9 min-h-[36px] flex items-center justify-between bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 select-none"
        onPointerDown={handlePointerDown}
      >
        <div className="flex items-center px-3 space-x-2 overflow-hidden">
          <div className="w-4 h-4">{window.icon}</div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{window.title}</span>
        </div>
        <div className="flex h-full">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-11 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Minus className="w-4 h-4 text-slate-500" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-11 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
             {window.isMaximized ? <Copy className="w-3 h-3 text-slate-500" /> : <Square className="w-3 h-3 text-slate-500" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-11 h-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors group"
          >
            <X className="w-4 h-4 text-slate-500 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {window.content}
        {/* Click trap for iframe-like content (not used here but good practice) */}
        {!window.isMaximized && isDragging && (
            <div className="absolute inset-0 bg-transparent" />
        )}
      </div>
    </div>
  );
};