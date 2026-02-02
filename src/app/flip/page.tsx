'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HistoryManager } from '@/lib/history';

export default function FlipPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFlip = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    
    try {
      const res = await fetch('/api/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (data.flipped) {
        setResult(data.flipped);
        // Save to history
        HistoryManager.add({
          type: 'flip',
          title: '念头翻转',
          data: {
            input: input,
            result: data.flipped
          }
        });
      }
    } catch (e) {
      console.error(e);
      setResult('AI 正在休息，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${
      result ? 'bg-gradient-to-br from-amber-50/80 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30' : 'bg-transparent'
    }`}>
      {/* 温暖光晕背景层 */}
      {result && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[100px] animate-warm-glow mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-100/30 to-transparent animate-sun-rise delay-100" />
        </div>
      )}

      <main className="relative z-10 p-6 max-w-md mx-auto flex flex-col gap-6">
        <header className="flex items-center gap-4 pt-4">
          <Link href="/" className={`text-sm font-bold uppercase hover:underline ${result ? 'text-amber-900 dark:text-amber-100' : ''}`}>← Back</Link>
          <h1 className={`text-xl font-bold uppercase ${result ? 'text-amber-950 dark:text-amber-50' : ''}`}>Mind Flip</h1>
        </header>

        <div className="flex flex-col gap-4">
          <div className={`transition-colors duration-700 p-4 rounded-lg border ${
            result 
              ? 'bg-white/50 border-amber-200/50 dark:bg-black/20 dark:border-amber-900/30' 
              : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
          }`}>
            <label className={`text-xs font-bold uppercase mb-2 block ${result ? 'text-amber-700/60' : 'text-zinc-500'}`}>Negative Thought</label>
            <textarea 
              className="w-full bg-transparent resize-none outline-none min-h-[120px]"
              placeholder="写下当下困扰你的念头..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button 
            onClick={handleFlip}
            disabled={loading || !input.trim()}
            className={`py-3 px-4 font-bold uppercase text-sm rounded transition-all duration-500 ${
              result 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600'
                : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90 disabled:opacity-50'
            }`}
          >
            {loading ? 'Flipping...' : result ? 'Flip Another Thought ✨' : 'Flip Thought ⚡️'}
          </button>

          {(result || loading) && (
            <div className={`mt-4 p-6 rounded-xl border shadow-sm transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 ${
              result
                ? 'bg-white/80 border-amber-200 shadow-orange-500/10 dark:bg-black/40 dark:border-amber-800'
                : 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800 border-indigo-100 dark:border-zinc-700'
            }`}>
              <label className={`text-xs font-bold uppercase mb-2 block ${
                result ? 'text-amber-600' : 'text-indigo-500'
              }`}>Positive Flip</label>
              
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-indigo-200/50 rounded w-3/4"></div>
                  <div className="h-4 bg-indigo-200/50 rounded w-1/2"></div>
                </div>
              ) : (
                <p className={`text-lg font-medium leading-relaxed whitespace-pre-wrap ${
                  result ? 'text-amber-950 dark:text-amber-50' : 'text-indigo-900 dark:text-indigo-100'
                }`}>
                  {result}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
