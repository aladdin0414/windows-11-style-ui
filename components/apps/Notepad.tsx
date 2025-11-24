import React, { useState } from 'react';

export const Notepad: React.FC = () => {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full bg-white text-slate-900">
      <div className="flex items-center px-2 py-1 border-b border-slate-200 text-xs space-x-2">
        <button className="px-2 py-1 hover:bg-slate-100 rounded">File</button>
        <button className="px-2 py-1 hover:bg-slate-100 rounded">Edit</button>
        <button className="px-2 py-1 hover:bg-slate-100 rounded">View</button>
      </div>
      <textarea
        className="flex-1 w-full p-4 resize-none focus:outline-none font-mono text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type something..."
      />
      <div className="px-4 py-1 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
        <span>UTF-8</span>
        <span>Windows (CRLF)</span>
      </div>
    </div>
  );
};