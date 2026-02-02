import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // 检查 API Key 是否存在 (支持 DEEPSEEK_API_KEY 或 OPENAI_API_KEY)
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('DeepSeek/OpenAI API Key is missing, returning mock response');
      // 返回模拟数据，保证演示环境可用
      return NextResponse.json({ 
        flipped: "（演示模式）亲爱的，虽然现在连接不上 AI 大脑，但我依然听到了你的心声。\n\n✨ 翻转念头：现在的困难只是暂时的，你比你想象的更强大。"
      });
    }

    // 仅在有 Key 时初始化 OpenAI
    // 优先使用环境变量中的 Base URL，默认为 DeepSeek 官方地址
    const baseURL = process.env.DEEPSEEK_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.deepseek.com';
    
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `你是一位极具同理心、温暖且充满热情的生活观察家。你的任务是“念头翻转”。

严格遵守以下输出格式，不要有任何开场白或多余的解释。

[User Input]: 我觉得我很失败，什么都做不好。
[Output]:
亲爱的，这种感觉真的很沉重，抱抱你。但请相信，这只是当下的挫败感在说话，并不代表你的全部。你对自己有要求，恰恰说明你渴望成长。

✨ 翻转念头：我不必事事完美，每一次尝试本身就是胜利，我在进步的路上。

[User Input]: 大家都不喜欢我，我很孤独。
[Output]:
孤独的时候，世界好像都关上了灯，我能感受到你的失落。但请记住，这不是因为你不好，而是属于你的同频信号还没被接收到。你本身就值得被爱。

✨ 翻转念头：我享受独处的丰盛，也敞开怀抱迎接懂我的人，我值得美好的连接。

请按照上面的 [Output] 格式，直接回复用户的内容。`
        },
        { 
          role: "user", 
          content: text 
        }
      ],
      // 优先使用环境变量中的模型名称，默认为 deepseek-chat
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: 0.8, 
      max_tokens: 500,
    });

    const flippedText = completion.choices[0].message.content;

    return NextResponse.json({ 
      flipped: flippedText
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return NextResponse.json({ 
      error: 'AI 思考过载，请稍后再试',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
