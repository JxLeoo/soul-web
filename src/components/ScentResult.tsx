"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Result } from "@/lib/data";
import { toPng } from "html-to-image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScentResultProps {
  result: Result;
}

const THEMES: Record<string, string> = {
  E: "bg-orange-50/80 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100",
  O: "bg-cyan-50/80 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-100",
  A: "bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
  S: "bg-zinc-100/80 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100",
};

const ACCENT_COLORS: Record<string, string> = {
  E: "bg-orange-500",
  O: "bg-cyan-500",
  A: "bg-emerald-500",
  S: "bg-zinc-800 dark:bg-zinc-200",
};

// 海报专用主题色（强制浅色，确保生成效果一致）
const POSTER_THEMES: Record<string, string> = {
  E: "bg-orange-50 text-orange-950",
  O: "bg-cyan-50 text-cyan-950",
  A: "bg-emerald-50 text-emerald-950",
  S: "bg-zinc-50 text-zinc-900",
};

export default function ScentResult({ result }: ScentResultProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const themeClass = THEMES[result.id] || THEMES["A"];
  const accentClass = ACCENT_COLORS[result.id] || ACCENT_COLORS["A"];
  const posterTheme = POSTER_THEMES[result.id] || POSTER_THEMES["A"];

  const handleGenerate = async () => {
    if (!posterRef.current) return;
    setGenerating(true);

    try {
      // 1. 等待一下，确保 DOM 渲染就绪
      await new Promise(resolve => setTimeout(resolve, 100));

      // 2. 使用 html-to-image 生成图片
      // cacheBust: true 防止图片缓存问题
      // pixelRatio: 2 保证高清
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 更高的清晰度
        quality: 1.0,
        backgroundColor: '#ffffff', // 确保背景不透明
      });

      // 3. 展示生成的图片
      setGeneratedImage(dataUrl);

    } catch (err) {
      console.error("生成失败:", err);
      alert("生成图片失败，请重试或直接截图");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto pb-12 animate-in fade-in duration-700">
      
      {/* 屏幕显示的卡片区域 */}
      <div className={cn("w-full rounded-2xl p-8 border shadow-sm relative overflow-hidden", themeClass)}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 dark:bg-black/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Scent Personality</span>
          <span className={cn("text-[10px] font-bold px-2 py-0.5 text-white rounded", accentClass)}>
            LITE
          </span>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 tracking-tight">{result.title}</h1>
          <p className="text-sm opacity-80 italic font-medium">"{result.description}"</p>
        </div>

        <div className="flex gap-2 mt-6 relative z-10 flex-wrap">
          {result.traits?.map(trait => (
            <span key={trait} className="px-3 py-1 bg-white/60 dark:bg-black/20 rounded-full text-xs font-bold border border-black/5">
              #{trait}
            </span>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-black/5 relative z-10">
          <div className="text-[10px] uppercase opacity-50 mb-1">Signature Scent</div>
          <div className="font-serif text-lg font-medium">{result.scentNote}</div>
        </div>

        <div className="mt-6 text-sm leading-relaxed opacity-90 relative z-10">
          {result.detail}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        {result.dimensions && Object.entries(result.dimensions).map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-xl">
            <div className="text-xs uppercase text-zinc-400 font-bold mb-1 tracking-wider">
              {key === 'career' ? 'CAREER / 适合职业' : 
               key === 'relationship' ? 'LOVE / 恋爱模式' : 
               key === 'social' ? 'SOCIAL / 社交风格' :
               key === 'strength' ? 'STRENGTH / 核心优势' : 'ADVICE / 建议'}
            </div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        <button 
          onClick={handleGenerate}
          disabled={generating}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2",
            accentClass,
            generating && "opacity-70 cursor-wait"
          )}
        >
          {generating ? "生成中..." : "📸 生成结果海报"}
        </button>
        
        <Link 
          href="/" 
          className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold rounded-xl text-center text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          返回实验室大厅
        </Link>
      </div>

      {/* --- 图片预览 Modal --- */}
      {generatedImage && (
        <div className="fixed inset-0 z-[10000] bg-black/90 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          {/* 图片容器 - 允许长按 */}
          <div className="relative w-full max-w-[375px] max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl">
            <img 
              src={generatedImage} 
              alt="Result Poster" 
              className="w-full h-auto block" 
              style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }} // 尝试禁用选中，但保留长按菜单
            />
          </div>
          
          <div className="mt-6 flex flex-col gap-3 items-center w-full max-w-[300px]">
            <p className="text-white text-sm font-bold animate-pulse">
              长按上方图片保存到相册
            </p>
            <button 
              onClick={() => setGeneratedImage(null)}
              className="w-full py-3 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              关闭预览
            </button>
          </div>
        </div>
      )}

      {/* --- 隐藏的海报模板 (离屏渲染源) --- */}
      {/* 使用 fixed 和负坐标将其移出视口，但保持渲染状态 */}
      <div className="fixed top-0 left-[-9999px] z-[-1]">
        <div 
          ref={posterRef} 
          className={cn("w-[375px] p-8 flex flex-col relative bg-white text-black", posterTheme)}
          style={{ minHeight: '667px' }} // 确保最小高度
        >
          {/* 海报内容 */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40">Cognitive Lab</span>
              <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded">LITE</span>
            </div>

            <h1 className="text-4xl font-black mb-4 text-black">{result.title}</h1>
            <div className="w-12 h-1 bg-black mb-6"></div>
            
            <p className="text-lg italic font-medium opacity-70 mb-8 text-black">"{result.description}"</p>

            <div className="flex gap-2 flex-wrap mb-8">
              {result.traits?.map(trait => (
                <span key={trait} className="px-3 py-1 border border-current rounded-full text-xs font-bold uppercase opacity-80">
                  {trait}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white/60 p-5 rounded-xl border border-black/5">
                <div className="text-xs uppercase font-bold opacity-40 mb-1 text-black">Signature Scent</div>
                <div className="text-xl font-serif text-black">{result.scentNote}</div>
              </div>

              <div className="text-sm leading-relaxed opacity-80 mb-8 text-black">
                {result.detail}
              </div>

              {result.dimensions && (
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {Object.entries(result.dimensions).map(([key, value]) => (
                    <div key={key} className="border-l-2 border-current pl-4">
                       <div className="text-[10px] font-bold uppercase mb-1 opacity-40 text-black">
                        {key === 'career' ? 'CAREER' : 
                         key === 'relationship' ? 'LOVE' : 
                         key === 'social' ? 'SOCIAL' :
                         key === 'strength' ? 'STRENGTH' : 'ADVICE'}
                       </div>
                       <div className="text-sm opacity-90 text-black">{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest opacity-40 text-black">Scan to test</span>
              <span className="text-sm font-bold mt-1 text-black">灵魂香味测试</span>
            </div>
            <div className="w-16 h-16 bg-black flex items-center justify-center text-white text-[8px] text-center p-1">
              QR CODE
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
