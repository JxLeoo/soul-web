import { tests } from "@/lib/data";
import TestFlow from "@/components/TestFlow";
import Link from "next/link";

export function generateStaticParams() {
  return tests.map((test) => ({
    id: test.id,
  }));
}

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = tests.find((t) => t.id === id);

  if (!test) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
        <h1 className="text-xl font-bold">404: Experiment Not Found</h1>
        <Link href="/" className="underline">Back to Lobby</Link>
      </div>
    );
  }

  // 如果没有题目，显示建设中
  if (!test.questions || test.questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
        <div className="text-4xl">🚧</div>
        <h1 className="text-xl font-bold">Experiment Under Construction</h1>
        <p className="text-sm text-zinc-500">此测试暂未开放观测。</p>
        <Link href="/" className="underline mt-4">Back to Lobby</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <TestFlow test={test} />
    </div>
  );
}
