"use client";

import Link from "next/link";
import { tests } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      
      {/* 增强版背景光效 (常驻色彩) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[60%] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[60%] bg-cyan-600/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[60%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-noise opacity-50" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* Header Branding */}
        <header className="flex flex-col items-center gap-6 mb-16 text-center w-full">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Leotiv
            </h1>
            <div className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter text-cyan-500 opacity-30 animate-glitch pointer-events-none mix-blend-screen" aria-hidden="true">
              Leotiv
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            {/* 新增：认知便利店 */}
            <span className="text-xs font-medium text-purple-300 tracking-[0.2em] mb-1 opacity-80">
              认知便利店
            </span>

            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/50"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Insight Express
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/50"></span>
            </div>
            
            <p className="text-xs md:text-sm text-zinc-400 font-mono max-w-xs leading-relaxed mt-3">
              这不是算命<br/>这是<span className="text-purple-400">灵魂的逆向工程</span>
            </p>
          </div>
        </header>

        {/* Test Cards Grid */}
        <div className="w-full grid grid-cols-1 gap-5 pb-20">
          {tests.map((test) => (
            <Link
              key={test.id}
              href={test.customUrl || `/test/${test.id}`}
              className="group relative block w-full active:scale-[0.98] transition-transform duration-200"
            >
              <div className="relative w-full bg-zinc-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border-gradient-cyber shadow-lg shadow-purple-900/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="p-5 flex items-start gap-4 relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {test.icon}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-white leading-tight">
                        {test.title}
                      </h2>
                      {/* Tags - 修复：允许换行，去除多余截断 */}
                      <div className="flex flex-wrap gap-1.5">
                         {test.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)] whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed opacity-80">
                      {test.description}
                    </p>
                    
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span>{test.stats}</span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="self-center w-5 h-5 flex items-center justify-center text-zinc-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="fixed bottom-6 left-0 w-full text-center pointer-events-none z-0 opacity-50">
          <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">
            LEOTIV SYSTEMS // ONLINE
          </p>
        </footer>

      </main>
    </div>
  );
}
