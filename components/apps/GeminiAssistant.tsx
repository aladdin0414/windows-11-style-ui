import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { sendMessageStream } from '../../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hi! I\'m your AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '' }]);

    let fullResponse = '';

    await sendMessageStream(input, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
      ));
    });

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm">
        <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
        <h2 className="font-semibold text-sm">Copilot Preview</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mx-2 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-indigo-500'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div
              className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start mr-auto max-w-[85%]">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mx-2 animate-pulse">
                   <Bot className="w-5 h-5 text-white" />
               </div>
               <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm text-sm text-slate-500 dark:text-slate-400">
                   Thinking...
               </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm shadow-sm"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-xs text-slate-400">AI can make mistakes. Check important info.</span>
        </div>
      </div>
    </div>
  );
};