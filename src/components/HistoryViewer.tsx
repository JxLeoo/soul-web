'use client';

import { useState, useEffect } from 'react';
import { HistoryManager, HistoryItem } from '@/lib/history';

export default function HistoryViewer({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(HistoryManager.getAll());
  }, []);

  const handleClear = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      HistoryManager.clear();
      setHistory([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-sm h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <header className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0">
          <h2 className="font-bold text-lg">我的历史记录</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
              <span className="text-4xl">📜</span>
              <p className="text-sm">暂无记录，快去测测看吧</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">
                    {item.type === 'flip' ? '🧠 念头翻转' : '📝 测试'}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                {item.type === 'flip' ? (
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-500 line-clamp-2">"{item.data.input}"</p>
                    <div className="h-px bg-zinc-100 dark:bg-zinc-700/50" />
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {item.data.result}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      结果：<span className="font-medium text-emerald-600 dark:text-emerald-400">{item.data.resultTitle}</span>
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <button 
              onClick={handleClear}
              className="w-full py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              清空记录
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
