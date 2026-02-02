"use client";

import { useState, useMemo, useCallback } from "react";
import { TestItem, Result, WeatherResult as IWeatherResult } from "@/lib/data";
import TestEngine from "./TestEngine";
import AccessGate from "./AccessGate";
import ScentResult from "./ScentResult";
import WeatherResult from "./WeatherResult"; // 导入新的结果组件
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HistoryManager } from "@/lib/history";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TestFlow({ test }: { test: TestItem }) {
  const [phase, setPhase] = useState<"intro" | "test" | "gate" | "result">("intro");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [calculatedResult, setCalculatedResult] = useState<Result | null>(null);

  const defaultTheme = useMemo(() => ({
    primaryColor: "bg-black dark:bg-white",
    secondaryColor: "bg-zinc-100 dark:bg-zinc-800",
    textColor: "text-zinc-900 dark:text-zinc-100",
    buttonStyle: "rounded-lg font-bold bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
    backgroundStyle: "bg-white dark:bg-black",
    startBtnText: "开始答题 →",
    gateTitle: "分析已完成",
    gateDesc: "请输入激活码以揭示结果",
    gateBtnText: "获取激活码",
    unlockBtnText: "解锁报告"
  }), []);

  const theme = test.theme || defaultTheme;

  const handleStart = useCallback(() => setPhase("test"), []);
  
  const calculateResult = useCallback((finalAnswers: Record<number, string>) => {
    if (!test.questions || !test.results) return;

    // 通用计分逻辑：计算每个维度的加权总分
    const scores: Record<string, number> = {};

    test.questions.forEach((q) => {
      const selectedValue = finalAnswers[q.id];
      const selectedOption = q.options.find(opt => opt.value === selectedValue);
      
      if (selectedOption) {
        const dimension = selectedOption.value;
        const weight = selectedOption.weight || 1;
        
        scores[dimension] = (scores[dimension] || 0) + weight;
      }
    });

    // 找出最高分维度
    let maxScore = -1;
    let resultType = "";

    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultType = type;
      }
    });

    // 如果没找到（极端情况），默认用第一个
    if (!resultType && test.results.length > 0) {
      resultType = test.results[0].id;
    }

    const finalResult = test.results.find(r => r.id === resultType);
    setCalculatedResult(finalResult || test.results[0]);
  }, [test.questions, test.results]);

  const handleComplete = useCallback((finalAnswers: Record<number, string>) => {
    setAnswers(finalAnswers);
    calculateResult(finalAnswers);
    // 使用 setTimeout 避免在渲染期间立即更新状态导致的问题
    setTimeout(() => setPhase("gate"), 500);
  }, [calculateResult]);

  const handleUnlock = useCallback(() => {
    setPhase("result");
    
    // Save history when unlocked
    if (calculatedResult) {
      HistoryManager.add({
        type: 'test',
        title: test.title,
        data: {
          testId: test.id,
          resultId: calculatedResult.id,
          resultTitle: calculatedResult.title
        }
      });
    }
  }, [calculatedResult, test.title, test.id]);

  return (
    <div className={cn("min-h-screen w-full transition-colors duration-500", theme.backgroundStyle)}>
      <div className="container mx-auto px-4 py-8 max-w-md min-h-screen flex flex-col justify-center">
        
        {phase === "intro" && (
          <div className="flex flex-col items-center gap-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-6xl animate-pulse">{test.icon}</div>
            <div className="flex flex-col gap-4">
              <h1 className={cn("text-2xl font-bold tracking-wide", theme.textColor)}>{test.title}</h1>
              <div className={cn("p-4 rounded-lg text-left text-sm space-y-2 max-w-xs mx-auto", theme.secondaryColor, theme.textColor)}>
                 <p>1️⃣ 这不是考试，没有标准答案</p>
                 <p>2️⃣ 请根据你真实的状态作答</p>
                 <p>3️⃣ 多数用户 3–5 分钟完成</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <button 
                onClick={handleStart}
                className={cn("w-full py-4 tracking-widest transition-transform hover:scale-105", theme.buttonStyle)}
              >
                {theme.startBtnText}
              </button>
              <p className="text-[10px] opacity-60">
                {test.stats}
              </p>
            </div>
          </div>
        )}

        {phase === "test" && test.questions && (
          <TestEngine 
            questions={test.questions} 
            onComplete={handleComplete} 
            theme={theme} 
          />
        )}

        {phase === "gate" && (
          <AccessGate 
            onUnlock={handleUnlock} 
            productUrl={test.productUrl} 
            theme={theme}
          />
        )}

        {phase === "result" && calculatedResult && (
          // 路由到不同的结果组件
          test.id === "scent-personality" ? (
            <ScentResult result={calculatedResult} />
          ) : test.id === "weather-mood" ? (
            <WeatherResult result={calculatedResult as IWeatherResult} />
          ) : (
            // 默认通用结果页
            <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in duration-500">
              <div className="text-xs opacity-50 uppercase tracking-widest border-b pb-2 mb-2">
                Analysis Complete
              </div>
              <h2 className="text-3xl font-bold">{calculatedResult?.title}</h2>
              <p className="leading-relaxed max-w-sm opacity-80">
                {calculatedResult?.description}
              </p>
              <Link href="/" className="mt-8 text-sm underline underline-offset-4">
                返回大厅
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
