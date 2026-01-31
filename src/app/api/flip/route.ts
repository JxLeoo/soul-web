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
          content: `你是一位极具同理心、温暖且充满热情的生活观察家。
          
          任务：对用户的烦恼进行“温柔而有力的反转”。
          
          回复结构（必须严格遵守）：
          第一部分【温暖接纳】（1-2句）：
          - 像给好朋友一个拥抱，接纳用户的情绪，肯定其背后的正面动机。语气要软，要有温度。
          
          （此处必须换行，并空一行）
          
          第二部分【念头翻转】（1-2句，重点！）：
          - 必须另起一段！
          - 使用“✨ 翻转念头：”作为前缀。
          - 明确给出一个新的、具体的、有建设性的认知框架。
          - 这句话要像一句“咒语”或“金句”，简短有力，直接打破原来的负面逻辑，指向行动或新的希望。
          
          语气风格：
          - 既有深夜电台的温柔，又有心理咨询师的专业洞察。
          - 拒绝正确的废话，要给到具体的思维抓手。` 
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
