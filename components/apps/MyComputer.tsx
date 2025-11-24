import React from 'react';
import { 
  HardDrive, 
  Monitor, 
  FileText, 
  Image, 
  Music, 
  Video, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp,
  Search,
  RotateCw,
  Star,
  Cloud,
  Home
} from 'lucide-react';

export const MyComputer: React.FC = () => {
  const sidebarItems = [
    { icon: <Home className="w-4 h-4 text-blue-500" />, label: 'Home' },
    { icon: <Star className="w-4 h-4 text-yellow-500" />, label: 'Gallery' },
    { icon: <Cloud className="w-4 h-4 text-blue-400" />, label: 'OneDrive' },
    { icon: <Monitor className="w-4 h-4 text-indigo-500" />, label: 'Desktop' },
    { icon: <Download className="w-4 h-4 text-green-500" />, label: 'Downloads' },
    { icon: <FileText className="w-4 h-4 text-slate-500" />, label: 'Documents' },
    { icon: <Image className="w-4 h-4 text-purple-500" />, label: 'Pictures' },
    { icon: <Music className="w-4 h-4 text-pink-500" />, label: 'Music' },
    { icon: <Video className="w-4 h-4 text-orange-500" />, label: 'Videos' },
  ];

  const folders = [
    { name: 'Desktop', icon: <Monitor className="w-8 h-8 text-indigo-500" /> },
    { name: 'Documents', icon: <FileText className="w-8 h-8 text-yellow-500" /> },
    { name: 'Downloads', icon: <Download className="w-8 h-8 text-green-500" /> },
    { name: 'Music', icon: <Music className="w-8 h-8 text-pink-500" /> },
    { name: 'Pictures', icon: <Image className="w-8 h-8 text-purple-500" /> },
    { name: 'Videos', icon: <Video className="w-8 h-8 text-orange-500" /> },
  ];

  const drives = [
    { 
      name: 'Local Disk (C:)', 
      total: 476, 
      free: 150, 
      icon: <HardDrive className="w-8 h-8 text-slate-500" /> 
    },
    { 
        name: 'Data (D:)', 
        total: 931, 
        free: 800, 
        icon: <HardDrive className="w-8 h-8 text-slate-500" /> 
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#fbfbfb] dark:bg-[#191919] text-slate-900 dark:text-white">
      {/* Toolbar */}
      <div className="flex items-center px-2 py-2 border-b border-slate-200 dark:border-slate-800 bg-[#f3f3f3] dark:bg-[#202020] space-x-4 text-sm">
        <button className="flex items-center px-3 py-1.5 bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 border border-slate-200 dark:border-slate-700 rounded shadow-sm transition-colors">
            <span className="text-xl mr-2 text-blue-600 font-light">+</span> New
        </button>
        <div className="h-6 w-[1px] bg-slate-300 dark:bg-slate-700 mx-2" />
        <div className="flex space-x-1">
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><span className="sr-only">Cut</span>✂️</button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><span className="sr-only">Copy</span>📄</button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><span className="sr-only">Paste</span>📋</button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><span className="sr-only">Rename</span>✏️</button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><span className="sr-only">Delete</span>🗑️</button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-4 py-2 space-x-3 border-b border-slate-200 dark:border-slate-800 bg-[#fbfbfb] dark:bg-[#191919]">
        <div className="flex space-x-2 text-slate-500">
            <ArrowLeft className="w-4 h-4 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
            <ArrowRight className="w-4 h-4 opacity-50 cursor-not-allowed" />
            <ArrowUp className="w-4 h-4 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
        </div>
        
        <div className="flex-1 flex items-center px-3 py-1.5 bg-white dark:bg-[#2c2c2c] border border-slate-200 dark:border-slate-600 rounded hover:border-blue-400 dark:hover:border-slate-500 transition-colors">
            <Monitor className="w-4 h-4 text-slate-500 mr-2" />
            <span className="text-xs mr-auto">This PC</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
        </div>

        <div className="w-60 flex items-center px-3 py-1.5 bg-white dark:bg-[#2c2c2c] border border-slate-200 dark:border-slate-600 rounded hover:border-blue-400 dark:hover:border-slate-500 transition-colors">
            <Search className="w-3 h-3 text-slate-500 mr-2" />
            <span className="text-xs text-slate-400">Search This PC</span>
        </div>
        
        <RotateCw className="w-4 h-4 text-slate-500 hover:rotate-180 transition-transform cursor-pointer" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 p-2 overflow-y-auto text-xs font-medium">
            {sidebarItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 px-2 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded cursor-pointer group">
                    <span className="opacity-70 group-hover:opacity-100">{item.icon}</span>
                    <span>{item.label}</span>
                </div>
            ))}
            <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-1 px-2 py-1 text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-white">
                    <ChevronRight className="w-3 h-3" />
                    <span>This PC</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-white">
                    <ChevronRight className="w-3 h-3" />
                    <span>Network</span>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
            
            {/* Folders Group */}
            <div className="mb-6">
                <div className="flex items-center mb-2 group cursor-pointer">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mr-2">Folders (6)</span>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-slate-700" />
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-2 rotate-90" />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {folders.map((folder) => (
                        <div key={folder.name} className="flex flex-col items-center justify-center p-2 rounded hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-100 dark:hover:border-white/10 cursor-pointer transition-colors">
                            <div className="mb-2 transform scale-90">{folder.icon}</div>
                            <span className="text-xs text-center font-medium">{folder.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Drives Group */}
            <div>
                <div className="flex items-center mb-2 group cursor-pointer">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mr-2">Devices and drives (2)</span>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-slate-700" />
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-2 rotate-90" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drives.map((drive) => {
                        const percentUsed = ((drive.total - drive.free) / drive.total) * 100;
                        return (
                            <div key={drive.name} className="flex items-center p-3 rounded hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-100 dark:hover:border-white/10 cursor-pointer transition-colors group">
                                <div className="mr-4">{drive.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium mb-1 truncate">{drive.name}</div>
                                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                                        <div 
                                            className={`h-full ${percentUsed > 90 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                            style={{ width: `${percentUsed}%` }} 
                                        />
                                    </div>
                                    <div className="text-xs text-slate-500 truncate">{drive.free} GB free of {drive.total} GB</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#f3f3f3] dark:bg-[#202020] border-t border-slate-200 dark:border-slate-800 flex items-center px-4 text-[10px] text-slate-500 space-x-4">
          <span>8 items</span>
          <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
          <span>1 item selected 150 GB</span>
      </div>
    </div>
  );
};