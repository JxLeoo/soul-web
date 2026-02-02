"use client";

import { useState } from "react";
import { verifyCode } from "@/lib/codes";
import { TestTheme } from "@/lib/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AccessGateProps {
  onUnlock: () => void;
  productUrl?: string;
  theme: TestTheme;
}

export default function AccessGate({ onUnlock, productUrl, theme }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verifyCode(code)) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="text-4xl animate-bounce">🔒</div>
        <h2 className={cn("text-xl font-bold", theme.textColor)}>{theme.gateTitle}</h2>
        <p className={cn("text-sm opacity-60", theme.textColor)}>{theme.gateDesc}</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            placeholder="输入激活码"
            className={cn(
              "w-full p-4 text-center text-lg tracking-[0.5em] font-mono border rounded-lg outline-none transition-all duration-300",
              theme.textColor,
              "bg-transparent focus:ring-2 placeholder:opacity-50",
              error 
                ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20" 
                : cn("border-zinc-300 dark:border-zinc-700 opacity-80 focus:opacity-100", theme.primaryColor.replace("bg-", "ring-")) // 动态 focus ring
            , shake && "animate-shake")}
          />
          {error && (
            <span className="absolute -bottom-6 left-0 w-full text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
              激活码无效，请核对后重试
            </span>
          )}
        </div>
        
        <button
          type="submit"
          disabled={code.length === 0}
          className={cn(
            "w-full p-4 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed",
            theme.buttonStyle // 使用主题定义的按钮样式
          )}
        >
          {theme.unlockBtnText}
        </button>
      </form>

      <div className={cn("w-full border-t pt-6 flex flex-col gap-3", theme.textColor, "border-current border-opacity-10")}>
        <p className="text-xs uppercase opacity-40">如何获取激活码？</p>
        
        {productUrl ? (
          <a
            href={productUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-bold transition-colors",
              theme.secondaryColor, // 使用辅助色作为背景
              theme.textColor,      // 使用主文本色
              "hover:opacity-80"
            )}
          >
            {theme.gateBtnText}
          </a>
        ) : (
          <a
            href="https://www.xiaohongshu.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <span>🧧</span> 关注小红书获取
          </a>
        )}
        
        <p className="text-[10px] opacity-40 mt-2">
          * 测试码: 8888 (开发环境可用)
        </p>
      </div>
    </div>
  );
}
