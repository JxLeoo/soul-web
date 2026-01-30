'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      }
    } catch (e) {
      console.error(e);
      setResult('AI 正在休息，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 max-w-md mx-auto flex flex-col gap-6">
      <header className="flex items-center gap-4 pt-4">
        <Link href="/" className="text-sm font-bold uppercase hover:underline">← Back</Link>
        <h1 className="text-xl font-bold uppercase">Mind Flip</h1>
      </header>

      <div className="flex flex-col gap-4">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <label className="text-xs font-bold uppercase text-zinc-500 mb-2 block">Negative Thought</label>
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
          className="bg-black dark:bg-white text-white dark:text-black py-3 px-4 font-bold uppercase text-sm rounded hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {loading ? 'Flipping...' : 'Flip Thought ⚡️'}
        </button>

        {(result || loading) && (
          <div className="mt-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800 rounded-xl border border-indigo-100 dark:border-zinc-700 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-4">
            <label className="text-xs font-bold uppercase text-indigo-500 mb-2 block">Positive Flip</label>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-indigo-200/50 rounded w-3/4"></div>
                <div className="h-4 bg-indigo-200/50 rounded w-1/2"></div>
              </div>
            ) : (
              <p className="text-lg font-medium text-indigo-900 dark:text-indigo-100 leading-relaxed whitespace-pre-wrap">
                {result}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
