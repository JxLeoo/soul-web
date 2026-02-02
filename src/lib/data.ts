export interface Option {
  label: string;
  value: string;
  weight?: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface ResultDimension {
  career: string;
  relationship: string;
  social: string;
  strength: string;
  advice: string;
}

export interface WeatherDimension {
  state: string;
  emotion: string;
  relationship: string;
  work: string;
  need: string;
}

// 修改 Result 接口，使其包含所有可能的字段（作为可选）
export interface Result {
  id: string;
  title: string;
  description: string;
  traits?: string[];
  scentNote?: string;
  detail?: string;
  dimensions?: ResultDimension;
  // 天气测试扩展字段
  weatherNote?: string;
  quote?: string;
  weatherDimensions?: WeatherDimension;
}

export interface TestTheme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  buttonStyle: string;
  backgroundStyle: string;
  fontFamily?: string;
  startBtnText: string;
  gateTitle: string;
  gateDesc: string;
  gateBtnText: string;
  unlockBtnText: string;
}

// WeatherResult 可以保留作为类型别名，或者直接移除
export interface WeatherResult extends Result {
  weatherNote: string;
  quote: string;
  weatherDimensions: WeatherDimension;
}

export interface TestItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  stats: string;
  isHot?: boolean;
  customUrl?: string;
  questions?: Question[];
  results?: Result[];
  productUrl?: string;
  theme?: TestTheme;
}

// 提取天气测试定义以便复用和排序
const weatherTest: TestItem = {
  id: "weather-mood",
  title: "天气测试 Lite 版",
  description: "你最近的内心天气预报：是晴天、薄雾还是雷阵雨？",
  icon: "🌤️",
  tags: ["Lite", "状态", "治愈"],
  stats: "9,821人已预报",
  isHot: true,
  productUrl: "https://www.xiaohongshu.com/discovery/item/65d123456789",
  
  theme: {
    primaryColor: "bg-sky-500",
    secondaryColor: "bg-sky-50 dark:bg-sky-900/20",
    textColor: "text-sky-900 dark:text-sky-100",
    buttonStyle: "rounded-2xl font-bold bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all active:scale-95",
    backgroundStyle: "bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900",
    startBtnText: "查看我的天气预报",
    gateTitle: "云图分析完成",
    gateDesc: "输入气象代码以获取报告",
    gateBtnText: "获取气象代码 ☁️",
    unlockBtnText: "揭晓天气"
  },

  questions: [
    {
      id: 1,
      text: "最近早上醒来，你更常出现的第一反应是？",
      options: [
        { label: "好，开始一天", value: "Sunny", weight: 2 },
        { label: "再给我一点缓冲", value: "Cloudy", weight: 2 },
        { label: "身体醒了，情绪没跟上", value: "Foggy", weight: 2 },
        { label: "情绪先醒了", value: "Rainy", weight: 2 },
      ],
    },
    {
      id: 2,
      text: "最近聊天时，你更像？",
      options: [
        { label: "正常交流，不太费力", value: "Sunny", weight: 1 },
        { label: "看心情决定聊不聊", value: "Cloudy", weight: 1 },
        { label: "能聊，但会消耗", value: "Snowy", weight: 1 },
        { label: "容易被情绪带着跑", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 3,
      text: "一天结束后，更常出现的画面是？",
      options: [
        { label: "还能顺手做点别的", value: "Sunny", weight: 1 },
        { label: "放空一会再说", value: "Cloudy", weight: 1 },
        { label: "只想安静待着", value: "Snowy", weight: 1 },
        { label: "情绪在脑子里打转", value: "Rainy", weight: 1 },
      ],
    },
    {
      id: 4,
      text: "最近你的情绪整体更像？",
      options: [
        { label: "比较平稳", value: "Sunny", weight: 1 },
        { label: "偶尔飘一下", value: "Cloudy", weight: 1 },
        { label: "低低的，但还在", value: "LightRain", weight: 1 },
        { label: "起伏比较明显", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 5,
      text: "计划突然被打乱时，你更接近？",
      options: [
        { label: "行，改一下", value: "Sunny", weight: 1 },
        { label: "有点烦，但能忍", value: "Cloudy", weight: 1 },
        { label: "心里抗拒，但不说", value: "Foggy", weight: 1 },
        { label: "情绪直接写在脸上", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 6,
      text: "最近你最想要的空间是？",
      options: [
        { label: "正常社交", value: "Sunny", weight: 1 },
        { label: "可进可退", value: "Cloudy", weight: 1 },
        { label: "明确的独处", value: "Snowy", weight: 1 },
        { label: "看当天状态", value: "Rainy", weight: 1 },
      ],
    },
    {
      id: 7,
      text: "最近你的注意力状态？",
      options: [
        { label: "基本在线", value: "Sunny", weight: 1 },
        { label: "时好时坏", value: "Cloudy", weight: 1 },
        { label: "明显不太行", value: "Foggy", weight: 1 },
        { label: "经常被情绪打断", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 8,
      text: "你对接下来一段时间的感觉更像？",
      options: [
        { label: "心里有底", value: "Sunny", weight: 1 },
        { label: "模糊，但不慌", value: "Cloudy", weight: 1 },
        { label: "有点压着", value: "LightRain", weight: 1 },
        { label: "容易焦躁", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 9,
      text: "最近你更容易？",
      options: [
        { label: "保持理性", value: "Sunny", weight: 1 },
        { label: "反复想同一件事", value: "Rainy", weight: 1 },
        { label: "被小事影响", value: "LightRain", weight: 1 },
        { label: "情绪突然上来", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 10,
      text: "最近的你，更像在？",
      options: [
        { label: "正常前进", value: "Sunny", weight: 1 },
        { label: "边走边调", value: "Cloudy", weight: 1 },
        { label: "低速运行", value: "LightRain", weight: 1 },
        { label: "被情绪牵着走", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 11,
      text: "如果现在能少一件事，你最想少的是？",
      options: [
        { label: "无谓的干扰", value: "Sunny", weight: 1 },
        { label: "不确定感", value: "Foggy", weight: 1 },
        { label: "社交消耗", value: "Snowy", weight: 1 },
        { label: "情绪内耗", value: "Rainy", weight: 1 },
      ],
    },
    {
      id: 12,
      text: "别人最近更可能怎么形容你？",
      options: [
        { label: "稳", value: "Sunny", weight: 1 },
        { label: "有点飘", value: "Cloudy", weight: 1 },
        { label: "安静", value: "Snowy", weight: 1 },
        { label: "情绪明显", value: "Stormy", weight: 1 },
      ],
    },
    {
      id: 13,
      text: "最近你对自己更像？",
      options: [
        { label: "接纳", value: "Sunny", weight: 1 },
        { label: "有点犹豫", value: "Foggy", weight: 1 },
        { label: "偏严格", value: "LightRain", weight: 1 },
        { label: "容易否定", value: "Rainy", weight: 1 },
      ],
    },
    {
      id: 14,
      text: "当你一个人待着时，更接近？",
      options: [
        { label: "充电", value: "Sunny", weight: 1 },
        { label: "放空", value: "Cloudy", weight: 1 },
        { label: "低能耗", value: "Snowy", weight: 1 },
        { label: "情绪回放", value: "Rainy", weight: 1 },
      ],
    },
    {
      id: 15,
      text: "现在的你，更需要哪种调整？",
      options: [
        { label: "维持节奏", value: "Sunny", weight: 1 },
        { label: "微调方向", value: "Cloudy", weight: 1 },
        { label: "好好休息", value: "LightRain", weight: 1 },
        { label: "情绪出口", value: "Stormy", weight: 1 },
      ],
    },
  ],
  results: [
    {
      id: "Sunny",
      title: "☀️ 晴天型",
      description: "今天整体晴朗，偶尔有风，但不影响出行。",
      weatherNote: "今天整体晴朗，偶尔有风，但不影响出行。",
      quote: "最近是晴天，状态在线。",
      detail: "你的能量场像正午的阳光，通透、明亮且富有穿透力。无论是处理工作还是面对人际，你都展现出了极高的稳定性和掌控感。这种“在线”的状态并非强撑，而是内在秩序井然有序的自然外溢。你不需要额外的修饰，光是站在那里，就是一种确定的力量。",
      traits: ["能量充沛", "秩序感", "掌控力"],
      weatherDimensions: {
        state: "你现在是在线的，各项机能运转良好。",
        emotion: "情绪稳定，不太折腾你，是你的帮手而非阻碍。",
        relationship: "偏理性，给人安全感，但不爱多说废话。",
        work: "节奏顺，能推进，效率处于高位。",
        need: "别瞎加戏，保持就好，享受当下的顺遂。"
      }
    },
    {
      id: "Cloudy",
      title: "�� 多云型",
      description: "云有点多，但没下雨。",
      weatherNote: "云有点多，但没下雨。",
      quote: "多云中，但还在走。",
      detail: "你正处于一种“中间状态”。没有强烈的阳光，也没有倾盆大雨，一切都显得有些暧昧不明。这并非坏事，云层为你遮挡了刺眼的直射光，给了你缓冲和思考的余地。你在调整，在观望，在积蓄力量。别急着拨开云雾，多云也是一种天气。",
      traits: ["缓冲期", "调整中", "潜力"],
      weatherDimensions: {
        state: "正在调整，还在路上，速度适中。",
        emotion: "不重，但悬着，偶尔会遮挡视线。",
        relationship: "需要空间，别被追着问，想自己静静。",
        work: "边走边调，不追求完美，只求推进。",
        need: "时间，而不是答案；允许自己暂时看不清。"
      }
    },
    {
      id: "LightRain",
      title: "🌧 小雨型",
      description: "在下雨，不大，但会一直滴。",
      weatherNote: "在下雨，不大，但会一直滴。",
      quote: "不是崩，是在下雨。",
      detail: "空气是潮湿的，心情是黏腻的。你可能感到一种持续的、低强度的消耗感。这不是崩溃的前兆，而是身心在发出“需要滋养”的信号。小雨适合在窗边发呆，不适合在雨中狂奔。允许自己慢下来，甚至停下来，淋湿了就去擦干，没什么大不了。",
      traits: ["敏感", "内省", "需滋养"],
      weatherDimensions: {
        state: "低速运转，像电量仅剩 20% 的手机。",
        emotion: "对外界更敏感，容易共情也容易受伤。",
        relationship: "容易累，需要被理解，渴望无声的陪伴。",
        work: "不适合硬撑，机械性工作尚可，创造性工作费劲。",
        need: "休息和空间，一场不被打扰的睡眠。"
      }
    },
    {
      id: "Stormy",
      title: "⛈ 雷阵雨型",
      description: "来得快，走得也快。",
      weatherNote: "来得快，走得也快。",
      quote: "像雷阵雨，但会过去。",
      detail: "你的内心正在经历一场风暴。情绪像雷电一样剧烈波动，能量在短时间内积聚又释放。这可能会让你感到失控，但请记住，雷雨天往往是空气最清新的时刻的前奏。你的爆发力很强，破坏力也强，关键在于如何引导这股巨大的能量。",
      traits: ["剧烈", "爆发力", "净化"],
      weatherDimensions: {
        state: "情绪波动明显，像过山车一样。",
        emotion: "不太能憋，压抑久了会炸。",
        relationship: "需要回应，冷处理会炸，热处理会化。",
        work: "容易被情绪牵着，效率极高或极低。",
        need: "一个出口，去运动、去呐喊、去宣泄。"
      }
    },
    {
      id: "Foggy",
      title: " 薄雾型",
      description: "看不远，但不是坏天气。",
      weatherNote: "看不远，但不是坏天气。",
      quote: "不是迷路，是起雾了。",
      detail: "世界在你眼中变得朦胧。你可能感到迷茫，找不到方向，或者对未来感到不确定。这种失焦感让人不安，但雾气本身是温柔的。它在提醒你，不必时刻都要看清远方，看清脚下的路就够了。等风来，雾自然会散。",
      traits: ["迷茫", "柔和", "等待"],
      weatherDimensions: {
        state: "方向感弱，像在森林里迷路。",
        emotion: "平稳，但迷糊，像隔着一层纱。",
        relationship: "需求不清晰，不知道自己想要什么。",
        work: "需要重新对焦，做减法，抓重点。",
        need: "清晰，而不是催促；给自己一点耐心。"
      }
    },
    {
      id: "Snowy",
      title: "❄️ 小雪型",
      description: "很安静，不太想说话。",
      weatherNote: "很安静，不太想说话。",
      quote: "最近在下雪，不太说话。",
      detail: "世界按下静音键，万物冬藏。你的能量正在向内收敛，外界的喧嚣很难打扰到你，你也懒得去打扰外界。这是一种极度干净、纯粹的状态。你在自我净化，在剔除杂质。冷一点没关系，雪化了就是春天。",
      traits: ["静谧", "收敛", "纯粹"],
      weatherDimensions: {
        state: "能量收敛，像冬眠的动物。",
        emotion: "向内消化，不外露，自我调节能力强。",
        relationship: "需要安全距离，靠近会冷，远了会念。",
        work: "适合安静推进，做深度思考类工作。",
        need: "边界被尊重，不要强行闯入我的领地。"
      }
    },
    {
      id: "Rainy",
      title: "🌧 小雨型",
      description: "在下雨，不大，但会一直滴。",
      weatherNote: "在下雨，不大，但会一直滴。",
      quote: "不是崩，是在下雨。",
      detail: "空气是潮湿的，心情是黏腻的。你可能感到一种持续的、低强度的消耗感。这不是崩溃的前兆，而是身心在发出“需要滋养”的信号。小雨适合在窗边发呆，不适合在雨中狂奔。允许自己慢下来，甚至停下来，淋湿了就去擦干，没什么大不了。",
      traits: ["敏感", "内省", "需滋养"],
      weatherDimensions: {
        state: "低速运转，像电量仅剩 20% 的手机。",
        emotion: "对外界更敏感，容易共情也容易受伤。",
        relationship: "容易累，需要被理解，渴望无声的陪伴。",
        work: "不适合硬撑，机械性工作尚可，创造性工作费劲。",
        need: "休息和空间，一场不被打扰的睡眠。"
      }
    },
  ],
};

export const tests: TestItem[] = [
  {
    id: "mind-flip",
    title: "念头翻转 · 烦恼粉碎机",
    description: "输入你的烦恼，帮你一键反转。把焦虑变成行动力，瞬间清醒。",
    icon: "☀️",
    tags: ["NEW", "工具"],
    stats: "∞人已翻转",
    isHot: true,
    customUrl: "/flip",
    theme: {
      primaryColor: "bg-blue-600",
      secondaryColor: "bg-blue-900",
      textColor: "text-blue-50",
      buttonStyle: "rounded-xl font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20",
      backgroundStyle: "bg-slate-900 text-white",
      startBtnText: "启动粉碎机",
      gateTitle: "反转能量已就绪",
      gateDesc: "输入激活密钥以接收新的思维模式",
      gateBtnText: "获取密钥 🔑",
      unlockBtnText: "立即反转"
    }
  },
  {
    id: "scent-personality",
    title: "香味人格测试 Lite",
    description: "如果你的灵魂有气味，它是凛冽刺骨的雪松，还是温热暧昧的麝香？",
    icon: "🧴",
    tags: ["NEW", "气质", "Lite"],
    stats: "18,592人已调制",
    isHot: true,
    productUrl: "https://www.xiaohongshu.com/discovery/item/65d123456789",
    
    theme: {
      primaryColor: "bg-zinc-900 dark:bg-zinc-100",
      secondaryColor: "bg-zinc-100 dark:bg-zinc-800",
      textColor: "text-zinc-900 dark:text-zinc-100",
      buttonStyle: "rounded-none border border-zinc-900 dark:border-zinc-100 uppercase tracking-[0.2em] font-serif hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-all",
      backgroundStyle: "bg-white dark:bg-black", 
      
      startBtnText: "调制我的气息",
      gateTitle: "香气已生成",
      gateDesc: "请输入调香师配方代码以提取结果",
      gateBtnText: "获取配方代码 🧴",
      unlockBtnText: "揭开封印"
    },
    // ... questions and results for scent test ...
    questions: [
      {
        id: 1,
        text: "你更喜欢哪种周末状态？",
        options: [
          { label: "随时出门，哪里热闹去哪", value: "E", weight: 2 },
          { label: "尝试一家没去过的小店", value: "O", weight: 2 },
          { label: "和熟悉的人安静相处", value: "A", weight: 2 },
          { label: "待在家，把生活整理好", value: "S", weight: 2 },
        ],
      },
      {
        id: 2,
        text: "走进一家陌生的店，你通常会？",
        options: [
          { label: "主动和店员聊两句", value: "E", weight: 1 },
          { label: "慢慢逛，观察细节", value: "O", weight: 1 },
          { label: "找个角落，感受氛围", value: "A", weight: 1 },
          { label: "快速判断值不值得待", value: "S", weight: 1 },
        ],
      },
      {
        id: 3,
        text: "情绪低落时，你更倾向于？",
        options: [
          { label: "找人聊聊，分散注意", value: "E", weight: 1 },
          { label: "换个环境或做点新事", value: "O", weight: 1 },
          { label: "安静独处，慢慢恢复", value: "A", weight: 1 },
          { label: "理性分析原因", value: "S", weight: 1 },
        ],
      },
      {
        id: 4,
        text: "你更容易被哪种事吸引？",
        options: [
          { label: "有人、有故事的场合", value: "E", weight: 1 },
          { label: "新奇、小众、有设计感", value: "O", weight: 1 },
          { label: "温柔、细腻的小细节", value: "A", weight: 1 },
          { label: "稳定、可靠的长期感", value: "S", weight: 1 },
        ],
      },
      {
        id: 5,
        text: "面对突发变化，你通常？",
        options: [
          { label: "随机应变，问题不大", value: "E", weight: 2 },
          { label: "觉得有点刺激", value: "O", weight: 2 },
          { label: "内心波动，但不外露", value: "A", weight: 2 },
          { label: "希望尽快恢复秩序", value: "S", weight: 2 },
        ],
      },
      {
        id: 6,
        text: "别人更可能如何评价你？",
        options: [
          { label: "好相处、热情", value: "E", weight: 1 },
          { label: "有想法、有风格", value: "O", weight: 1 },
          { label: "温柔、体贴", value: "A", weight: 1 },
          { label: "稳重、靠谱", value: "S", weight: 1 },
        ],
      },
      {
        id: 7,
        text: "你更喜欢哪种旅行？",
        options: [
          { label: "热闹城市，行程丰富", value: "E", weight: 1 },
          { label: "冷门目的地，自由探索", value: "O", weight: 1 },
          { label: "舒适慢节奏，放松身心", value: "A", weight: 1 },
          { label: "熟悉路线，计划明确", value: "S", weight: 1 },
        ],
      },
      {
        id: 8,
        text: "在社交场合，你通常？",
        options: [
          { label: "容易成为话题中心", value: "E", weight: 1 },
          { label: "更关注有趣的人", value: "O", weight: 1 },
          { label: "更在意氛围是否舒服", value: "A", weight: 1 },
          { label: "控制时间与节奏", value: "S", weight: 1 },
        ],
      },
      {
        id: 9,
        text: "你买东西时更看重？",
        options: [
          { label: "是否能提升心情", value: "E", weight: 1 },
          { label: "是否独特、有个性", value: "O", weight: 1 },
          { label: "是否让人安心", value: "A", weight: 1 },
          { label: "是否耐用、实用", value: "S", weight: 1 },
        ],
      },
      {
        id: 10,
        text: "当别人向你倾诉，你通常？",
        options: [
          { label: "陪着说、陪着笑", value: "E", weight: 1 },
          { label: "给新角度的建议", value: "O", weight: 1 },
          { label: "安静听，给情绪支持", value: "A", weight: 1 },
          { label: "帮对方理清思路", value: "S", weight: 1 },
        ],
      },
      {
        id: 11,
        text: "你更偏好的生活节奏是？",
        options: [
          { label: "丰富、多变化", value: "E", weight: 2 },
          { label: "自由、不被定义", value: "O", weight: 2 },
          { label: "柔软、留有余地", value: "A", weight: 2 },
          { label: "稳定、有掌控感", value: "S", weight: 2 },
        ],
      },
      {
        id: 12,
        text: "如果用颜色形容你，你更接近？",
        options: [
          { label: "明亮、跳跃", value: "E", weight: 1 },
          { label: "有层次、特别", value: "O", weight: 1 },
          { label: "柔和、浅色", value: "A", weight: 1 },
          { label: "深色、低饱和", value: "S", weight: 1 },
        ],
      },
      {
        id: 13,
        text: "你对“安全感”的理解是？",
        options: [
          { label: "被人包围", value: "E", weight: 1 },
          { label: "不被限制", value: "O", weight: 1 },
          { label: "被理解", value: "A", weight: 1 },
          { label: "可预期", value: "S", weight: 1 },
        ],
      },
      {
        id: 14,
        text: "别人靠近你时，常感受到？",
        options: [
          { label: "活力", value: "E", weight: 1 },
          { label: "好奇", value: "O", weight: 1 },
          { label: "温度", value: "A", weight: 1 },
          { label: "稳定", value: "S", weight: 1 },
        ],
      },
      {
        id: 15,
        text: "如果你是一种气味，更可能是？",
        options: [
          { label: "清新、明亮", value: "E", weight: 2 },
          { label: "特别、有辨识度", value: "O", weight: 2 },
          { label: "柔和、贴近", value: "A", weight: 2 },
          { label: "深沉、持久", value: "S", weight: 2 },
        ],
      },
    ],
    results: [
      {
        id: "E",
        title: "柑橘型人格 🍊",
        description: "你走到哪，气氛就亮到哪。",
        traits: ["明亮", "活力", "光源"],
        scentNote: "柑橘 / 绿叶 / 清新果香",
        detail: "你就像一颗行走的小太阳，拥有天然的感染力。你的能量是向外发散的，在人群中总是那个打破沉默、带来欢笑的人。你不一定非要成为主角，但有你在的地方，空气都是流通且明亮的。你对世界抱有善意，这种直接而热烈的特质，像剥开橘子时溅出的汁水，清新、提神，让人忍不住想靠近。",
        dimensions: {
          career: "适合需要高频互动与即时反馈的工作，如市场营销、公关、演艺或活动策划。",
          relationship: "热烈而直接，喜欢和伴侣分享一切。你需要一个能接住你热情，且不吝啬赞美的人。",
          social: "社交圈的核心光源，擅长破冰，但也容易因为太顾及气氛而忽略自己的疲惫。",
          strength: "极强的感染力和行动力，能迅速拉近人与人的距离。",
          advice: "偶尔允许自己关灯休息，不需要永远照亮别人。"
        }
      },
      {
        id: "O",
        title: "海盐型人格 ",
        description: "你对世界始终保留好奇心。",
        traits: ["自由", "边界感", "探索"],
        scentNote: "海盐 / 矿物感 / 冷感气息",
        detail: "你的灵魂里住着一片海，既有接纳一切的广阔，又有保持距离的冷峻。你讨厌被定义和束缚，比起“稳定”，你更迷恋“可能性”。你的精神世界很丰富，甚至有点古怪，但这就是你的魅力所在。你像海风一样难以捕捉，时而温和，时而凛冽，永远让人捉摸不透，却又忍不住想一探究竟。",
        dimensions: {
          career: "适合需要创意和独立空间的工作，如设计师、自由撰稿人、艺术家或独立开发者。",
          relationship: "注重精神共鸣，需要大量的个人空间。最好的伴侣是那个懂你沉默的人。",
          social: "若即若离，不喜欢无效社交。在感兴趣的话题上会突然变得健谈。",
          strength: "独特的视角和创造力，不受世俗框架的束缚。",
          advice: "在追求自由的同时，试着建立一两个深度的链接，作为靠岸的锚点。"
        }
      },
      {
        id: "A",
        title: "白茶型人格 ��",
        description: "你不是存在感最强的那种，但很容易让人安心。",
        traits: ["治愈", "包容", "余温"],
        scentNote: "白茶 / 轻花香 / 干净麝香",
        detail: "你拥有一种温润如玉的力量。在这个喧嚣的世界里，你选择用温柔来对抗粗糙。你善于倾听，懂得换位思考，你的存在就像一杯温热的白茶，不苦涩，不浓烈，却有悠长的回甘。朋友们喜欢找你倾诉，因为在你这里，所有的情绪都能被稳稳地接住。你柔软，但并不软弱。",
        dimensions: {
          career: "适合疗愈、教育或服务性质的工作，如心理咨询师、教师、人力资源或护理。",
          relationship: "细水长流，体贴入微。你倾向于付出，但也渴望被温柔对待。",
          social: "最好的倾听者，大家的情绪垃圾桶。但要注意保护自己的能量。",
          strength: "极强的共情能力和包容心，能化解冲突于无形。",
          advice: "学会拒绝，你的温柔很贵，不要浪费在不值得的人身上。"
        }
      },
      {
        id: "S",
        title: "乌木型人格 ",
        description: "你不张扬，但很有存在感。",
        traits: ["沉稳", "支撑", "底蕴"],
        scentNote: "木质 / 树脂 / 烟熏",
        detail: "你像一棵扎根深处的古树，无论外界风雨如何，你自岿然不动。你话不多，但每句都有分量。你追求秩序、逻辑和可控感，是混乱中最坚实的依靠。你的情感深沉而内敛，不轻易表露，但一旦认定，便是长久的守护。这种厚重的质感，如同经过时间沉淀的乌木，越品越有味道。",
        dimensions: {
          career: "适合需要严谨逻辑和长期规划的工作，如工程师、金融分析师、律师或高管。",
          relationship: "慢热但专一，行动多于言语。你提供的不是浪漫的泡沫，而是坚实的未来。",
          social: "圈子虽小但质量极高。你更看重长期的、经得起时间考验的情谊。",
          strength: "在危机时刻的冷静判断力和强大的执行力。",
          advice: "适度表达情感不是示弱，偶尔的感性会让你的稳重更具人情味。"
        }
      },
    ],
  },
  // 插入天气测试到第三位
  weatherTest,
  {
    id: "mbti-pro",
    title: "MBTI 灵知全境",
    description: "60道潜意识探针 + 隐藏盲盒，深度解析你的精神拓扑。",
    icon: "🔮",
    tags: ["PRO", "深度解析"],
    stats: "243人正在测",
    isHot: true,
    theme: {
      primaryColor: "bg-purple-600",
      secondaryColor: "bg-purple-900/20",
      textColor: "text-purple-900 dark:text-purple-100",
      buttonStyle: "rounded-full font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90",
      backgroundStyle: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20",
      startBtnText: "潜入潜意识",
      gateTitle: "精神拓扑已解析",
      gateDesc: "输入通行证以查看完整人格报告",
      gateBtnText: "获取通行证 ",
      unlockBtnText: "揭示真我"
    },
    questions: [
      {
        id: 1,
        text: "在一个喧闹的派对上，你通常会...",
        options: [
          { label: "成为注意力的中心，与多人交谈", value: "E" },
          { label: "只与几个熟悉的朋友待在角落", value: "I" },
        ],
      },
      {
        id: 2,
        text: "当你面对一个新任务时，你更倾向于...",
        options: [
          { label: "先了解整体概念和可能性", value: "N" },
          { label: "关注具体的细节和步骤", value: "S" },
        ],
      },
      {
        id: 3,
        text: "做决定时，你更看重...",
        options: [
          { label: "逻辑和客观事实", value: "T" },
          { label: "他人的感受和价值观", value: "F" },
        ],
      },
      {
        id: 4,
        text: "你的生活方式通常是...",
        options: [
          { label: "有计划、有条理的", value: "J" },
          { label: "灵活、随性的", value: "P" },
        ],
      },
    ],
    results: [
      {
        id: "ENTJ",
        title: "指挥官 (ENTJ)",
        description: "你是天生的领导者。你充满魅力和自信，拥有将大家带入共同目标的权威。",
      },
      {
        id: "INFP",
        title: "调停者 (INFP)",
        description: "你是真正的理想主义者。你总是寻找哪怕最坏的人和事中好的一面，寻找让世界变得更好的方法。",
      },
      {
        id: "DEFAULT",
        title: "神秘的观测者",
        description: "你的灵魂难以被简单的标签定义。你游离于规则之外，拥有独特的洞察力。",
      },
    ],
  },
  {
    id: "cat-personality",
    title: "小猫塑 · 灵魂观测局",
    description: "如果灵魂有形状，它一定是一只猫。你是高冷的玄猫，还是疯癫的奶牛？",
    icon: "🐾",
    tags: ["Psychology", "趣味"],
    stats: "32,841人已观测",
  },
  {
    id: "ex-files",
    title: "前任侧写",
    description: "揭开Ta的伪装 x 焚毁记忆仪式。毒性检测，立即复仇。",
    icon: "🥀",
    tags: ["HOT", "情感"],
    stats: "288人正在测",
    isHot: true,
  },
];
