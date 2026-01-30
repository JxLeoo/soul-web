"use client";

import { useState, useCallback } from "react";
import { Question } from "@/lib/data";
import { logEvent } from "@/lib/analytics";
import { TestTheme } from "@/lib/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TestEngineProps {
  questions: Question[];
  onComplete: (answers: Record<number, string>) => void;
  theme: TestTheme;
}

export default function TestEngine({ questions, onComplete, theme }: TestEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback((value: string) => {
    logEvent("select_option", {
      questionId: currentQuestion.id,
      selected: value,
      questionText: currentQuestion.text
    });

    // 立即更新本地状态
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    } else {
      // 答题结束
      onComplete(newAnswers);
    }
  }, [answers, currentQuestion, currentIndex, questions.length, onComplete]);

  return (
    <div className="w-full max-w-md flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Progress Bar */}
      <div className={cn("w-full h-1 rounded-full overflow-hidden opacity-20", theme.primaryColor)}>
        <div 
          className={cn("h-full transition-all duration-300 ease-out", theme.primaryColor)}
          style={{ width: `${progress}%`, opacity: 1 }}
        />
      </div>

      {/* Question */}
      <div className="flex flex-col gap-2 min-h-[120px]">
        <span className={cn("text-xs uppercase tracking-widest opacity-50", theme.textColor)}>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <h2 className={cn("text-xl font-bold leading-relaxed", theme.textColor)}>
          {currentQuestion.text}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "w-full p-4 text-left border rounded-lg transition-all active:scale-[0.98]",
              "border-current opacity-80 hover:opacity-100",
              theme.textColor,
              // 如果是香味测试，使用特殊 hover 效果
              theme.primaryColor.includes("zinc-900") 
                ? "hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
