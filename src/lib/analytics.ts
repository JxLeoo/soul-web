// 极简的前端埋点工具
// 如果未来接入 Vercel Analytics 或 Google Analytics，可以在这里统一处理

type EventName = "select_option" | "view_result" | "generate_poster" | "unlock_gate";

export function logEvent(name: EventName, properties: Record<string, any> = {}) {
  // 1. 开发环境日志
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}:`, properties);
  }

  // 2. 预留：发送到后端 API (如果用户未来部署了数据库)
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ name, properties }) });

  // 3. 预留：第三方 SDK 调用
  // if (window.gtag) window.gtag('event', name, properties);
}
