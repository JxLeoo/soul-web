"use client";

import { CityResult as ICityResult } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export default function CityResult({ result }: { result: ICityResult }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // 简单的分享逻辑：复制当前页面链接
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in duration-500 w-full max-w-lg mx-auto">
      {/* 顶部标签 */}
      <div className="text-xs font-bold text-indigo-500/60 uppercase tracking-[0.2em] mb-2">
        City Match Analysis
      </div>

      {/* 城市大标题 */}
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-black text-indigo-900 dark:text-indigo-100 mb-2">
          {result.title.split("｜")[0]}
        </h2>
        <div className="text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full inline-block">
          {result.title.split("｜")[1]}
        </div>
      </div>

      {/* 核心描述 */}
      <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-sm">
        {result.description}
      </p>

      {/* 详细维度卡片 */}
      {result.cityDimensions && (
        <div className="w-full grid gap-4 mt-4 text-left">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">城市气质</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
              {result.cityDimensions.cityTemperament}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">生活节奏</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.cityDimensions.lifePace}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">工作属性</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.cityDimensions.workStyle}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">社交关系</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.cityDimensions.socialStyle}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">情绪体验</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.cityDimensions.emotionalExp}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 适合人群标签 */}
      {result.fitFor && (
        <div className="w-full mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
          <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3">更适合你，如果你...</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {result.fitFor.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-white dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-xs font-bold rounded-lg shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 底部操作区 */}
      <div className="flex flex-col gap-3 w-full mt-6">
        <button 
          onClick={handleShare}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {copied ? "已复制链接 ✅" : "分享我的本命城市 🔗"}
        </button>
        
        <Link 
          href="/" 
          className="w-full py-4 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          返回大厅测试其他
        </Link>
      </div>

      <div className="text-[10px] text-slate-400 mt-4 max-w-xs leading-relaxed">
        * 本测试为生活方式探索工具，不构成现实迁移建议。请结合实际情况决策。
      </div>
    </div>
  );
}
