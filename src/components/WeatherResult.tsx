"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { WeatherResult as IWeatherResult } from "@/lib/data";
import { toPng } from "html-to-image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WeatherResultProps {
  result: IWeatherResult;
}

// 调整配色：背景加深，文字反白，确保对比度
const WEATHER_THEMES: Record<string, string> = {
  Sunny: "bg-orange-500 text-white border-orange-400/30",
  Cloudy: "bg-slate-500 text-white border-slate-400/30",
  LightRain: "bg-blue-500 text-white border-blue-400/30",
  Rainy: "bg-blue-600 text-white border-blue-500/30",
  Stormy: "bg-gray-700 text-white border-gray-600/30",
  Foggy: "bg-stone-500 text-white border-stone-400/30",
  Snowy: "bg-indigo-400 text-white border-indigo-300/30",
};

const WEATHER_BG: Record<string, string> = {
  Sunny: "bg-gradient-to-br from-orange-400 to-amber-600",
  Cloudy: "bg-gradient-to-br from-slate-400 to-slate-600",
  LightRain: "bg-gradient-to-br from-blue-400 to-cyan-600",
  Rainy: "bg-gradient-to-br from-blue-500 to-blue-700",
  Stormy: "bg-gradient-to-br from-gray-600 to-gray-800",
  Foggy: "bg-gradient-to-br from-stone-400 to-stone-600",
  Snowy: "bg-gradient-to-br from-indigo-300 to-blue-500",
};

export default function WeatherResult({ result }: WeatherResultProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const bgClass = WEATHER_BG[result.id] || WEATHER_BG["Sunny"];

  const handleGenerate = async () => {
    if (!posterRef.current) return;
    setGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 1.0,
        backgroundColor: '#ffffff',
      });
      setGeneratedImage(dataUrl);
    } catch (err) {
      console.error("生成失败:", err);
      alert("生成失败，请重试");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto pb-12 animate-in fade-in duration-700">
      
      {/* 屏幕展示卡片 */}
      <div className={cn("w-full rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white", bgClass)}>
        {/* 装饰性背景 */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-white/10 blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-black/10 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 天气图标 */}
          <div className="text-7xl mb-4 filter drop-shadow-lg animate-bounce-slow">
            {result.id === 'Sunny' ? '☀️' : 
             result.id === 'Cloudy' ? '🌤' : 
             result.id === 'LightRain' || result.id === 'Rainy' ? '��' :
             result.id === 'Stormy' ? '⛈' :
             result.id === 'Foggy' ? '🌫' : '❄️'}
          </div>
          
          <h1 className="text-3xl font-black mb-2 tracking-tight drop-shadow-md">{result.title}</h1>
          <p className="text-base font-medium mb-8 opacity-90">"{result.weatherNote}"</p>

          {/* 详细描述 */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-inner text-left mb-6">
            <p className="text-sm leading-relaxed opacity-95">
              {result.detail}
            </p>
          </div>

          {/* 关键词 */}
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {result.traits?.map(trait => (
              <span key={trait} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/30 backdrop-blur-sm">
                #{trait}
              </span>
            ))}
          </div>

          {/* 维度分析 */}
          <div className="w-full bg-black/20 backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-sm text-left">
            <div className="space-y-4">
              {result.weatherDimensions && Object.entries(result.weatherDimensions).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold uppercase opacity-60 tracking-wider">
                    {key === 'state' ? '整体状态' : 
                     key === 'emotion' ? '情绪运行' : 
                     key === 'relationship' ? '关系 / 恋爱' :
                     key === 'work' ? '工作 / 生活' : '你现在最需要的'}
                  </div>
                  <div className="text-sm font-medium leading-snug">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 font-serif text-lg italic opacity-80 border-t border-white/20 pt-6 w-full">
            {result.quote}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        <button 
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-4 rounded-xl font-bold text-white bg-white/10 border border-white/20 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-white/20"
        >
          {generating ? "生成中..." : "�� 生成天气海报"}
        </button>
        
        <Link 
          href="/" 
          className="w-full py-4 text-white/40 font-bold rounded-xl text-center text-sm hover:text-white/60 transition-colors"
        >
          返回实验室大厅
        </Link>
      </div>

      {/* --- 图片预览 Modal --- */}
      {generatedImage && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-[375px] max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl border border-white/10">
            <img src={generatedImage} alt="Result Poster" className="w-full h-auto block" />
          </div>
          <div className="mt-6 flex flex-col gap-3 items-center w-full max-w-[300px]">
            <p className="text-white text-sm font-bold animate-pulse">长按上方图片保存到相册</p>
            <button 
              onClick={() => setGeneratedImage(null)}
              className="w-full py-3 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              关闭预览
            </button>
          </div>
        </div>
      )}

      {/* --- 隐藏的海报模板 (离屏渲染源) --- */}
      <div className="fixed top-0 left-[-9999px] z-[-1]">
        <div 
          ref={posterRef} 
          className={cn("w-[375px] p-8 flex flex-col relative min-h-[800px] text-white", bgClass)}
        >
          <div className="flex-1 flex flex-col items-center text-center relative z-10">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-8 opacity-60 border-b border-white/20 pb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Insight Express</span>
              <span className="text-xs font-bold border border-white/40 px-2 py-0.5 rounded bg-white/10">WEATHER</span>
            </div>

            <div className="text-9xl mb-6 filter drop-shadow-2xl">
              {result.id === 'Sunny' ? '☀️' : 
               result.id === 'Cloudy' ? '🌤' : 
               result.id === 'LightRain' || result.id === 'Rainy' ? '��' :
               result.id === 'Stormy' ? '⛈' :
               result.id === 'Foggy' ? '🌫' : '❄️'}
            </div>

            <h1 className="text-5xl font-black mb-4 drop-shadow-md">{result.title}</h1>
            <p className="text-xl opacity-90 font-medium mb-8 px-2">"{result.weatherNote}"</p>

            {/* 详细描述区块 */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg text-left mb-6">
              <p className="text-sm leading-relaxed opacity-95 font-medium">
                {result.detail}
              </p>
            </div>

            {/* 维度分析区块 */}
            <div className="w-full bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg text-left mb-8">
              <div className="space-y-5">
                {result.weatherDimensions && Object.entries(result.weatherDimensions).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="text-[10px] font-bold uppercase opacity-50 tracking-wider text-white">
                      {key === 'state' ? 'STATE' : 
                       key === 'emotion' ? 'EMOTION' : 
                       key === 'relationship' ? 'RELATIONSHIP' :
                       key === 'work' ? 'WORK' : 'NEED'}
                    </div>
                    <div className="text-sm font-bold opacity-95 text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 语录 */}
            <div className="font-serif text-2xl italic opacity-80 mb-auto px-4 leading-normal">
              {result.quote}
            </div>

            {/* Footer */}
            <div className="w-full mt-12 pt-6 border-t border-white/20 flex justify-between items-end">
              <div className="flex flex-col items-start text-white/60">
                <span className="text-[10px] uppercase tracking-widest">Weather Report</span>
                <span className="text-sm font-bold mt-1 text-white">内心天气预报</span>
              </div>
              <div className="w-16 h-16 bg-white flex items-center justify-center text-black text-[8px] text-center p-1 rounded-lg font-bold">
                QR CODE
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
