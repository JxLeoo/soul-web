
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

// 城市匹配度测试定义
export interface CityResultDimension {
  cityTemperament: string; // 城市气质
  lifePace: string;        // 生活节奏
  workStyle: string;       // 工作属性
  socialStyle: string;     // 社交关系
  emotionalExp: string;    // 情绪体验
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
  // 城市测试扩展字段
  cityDimensions?: CityResultDimension;
  fitFor?: string[];       // 更适合你，如果你...
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

export interface CityResult extends Result {
  cityDimensions?: CityResultDimension;
  fitFor?: string[];       // 更适合你，如果你...
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
      title: "☁️ 多云型",
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
      title: "�� 薄雾型",
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

const cityTest: TestItem = {
  id: "city-match",
  title: "中国城市匹配度测试",
  description: "你最适合生活的中国城市是哪一座？不评判好坏，只讨论是否适合。",
  icon: "🏙️",
  tags: ["HOT", "生活", "城市"],
  stats: "5.2w人已匹配",
  isHot: true,
  productUrl: "https://www.xiaohongshu.com/user/profile/5b6a7b88e8ac2b00016a2b88", // 替换为实际的小红书链接
  
  theme: {
    primaryColor: "bg-indigo-600",
    secondaryColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-100",
    buttonStyle: "rounded-lg font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95",
    backgroundStyle: "bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950",
    startBtnText: "寻找我的本命城市",
    gateTitle: "城市匹配分析完成",
    gateDesc: "输入通行码以获取城市报告",
    gateBtnText: "获取通行码 🎫",
    unlockBtnText: "揭晓结果"
  },

  questions: [
    {
      id: 1,
      text: "理想的一天节奏更接近？",
      options: [
        { label: "明确计划，高效推进", value: "Beijing", weight: 1 }, // 北京/上海/深圳
        { label: "有安排，但可调整", value: "Hangzhou", weight: 1 },  // 杭州/南京/苏州
        { label: "不赶时间，随走随停", value: "Chengdu", weight: 1 }, // 成都/重庆/广州
        { label: "越热闹越有劲", value: "Changsha", weight: 1 },      // 长沙/武汉
      ]
    },
    {
      id: 2,
      text: "你对“卷”的真实态度是？",
      options: [
        { label: "接受，资源就在那里", value: "Beijing", weight: 1 },
        { label: "适度就好", value: "Hangzhou", weight: 1 },
        { label: "能不卷就不卷", value: "Chengdu", weight: 1 },
        { label: "不如痛快点活", value: "Changsha", weight: 1 },
      ]
    },
    {
      id: 3,
      text: "你更看重一座城市的？",
      options: [
        { label: "平台和上限", value: "Shanghai", weight: 1 },
        { label: "秩序与专业", value: "Suzhou", weight: 1 },
        { label: "生活舒服度", value: "Guangzhou", weight: 1 },
        { label: "情绪与氛围", value: "Chongqing", weight: 1 },
      ]
    },
    {
      id: 4,
      text: "周末你更可能？",
      options: [
        { label: "学习 / 工作相关", value: "Shenzhen", weight: 1 },
        { label: "精致休闲", value: "Shanghai", weight: 1 },
        { label: "朋友聚会 / 吃喝", value: "Guangzhou", weight: 1 },
        { label: "夜生活 / 临时起意", value: "Changsha", weight: 1 },
      ]
    },
    {
      id: 5,
      text: "你对房子和生活空间的态度？",
      options: [
        { label: "是资产，也是安全感", value: "Shanghai", weight: 1 },
        { label: "要有品质", value: "Hangzhou", weight: 1 },
        { label: "能住就行", value: "Shenzhen", weight: 1 },
        { label: "不重要，活得爽更重要", value: "Chongqing", weight: 1 },
      ]
    },
    {
      id: 6,
      text: "你更适合哪种人群密度？",
      options: [
        { label: "强者很多的地方", value: "Beijing", weight: 1 },
        { label: "各自有边界", value: "Shanghai", weight: 1 },
        { label: "熟人社会一点", value: "Xian", weight: 1 },
        { label: "热闹、有人气", value: "Wuhan", weight: 1 },
      ]
    },
    {
      id: 7,
      text: "你对陌生人的态度？",
      options: [
        { label: "先判断是否有用", value: "Shenzhen", weight: 1 },
        { label: "保持礼貌距离", value: "Shanghai", weight: 1 },
        { label: "随意、好说话", value: "Chengdu", weight: 1 },
        { label: "很容易聊起来", value: "Wuhan", weight: 1 },
      ]
    },
    {
      id: 8,
      text: "你更能忍受？",
      options: [
        { label: "压力", value: "Beijing", weight: 1 },
        { label: "冷漠", value: "Shanghai", weight: 1 },
        { label: "平庸", value: "Nanjing", weight: 1 },
        { label: "无聊", value: "Changsha", weight: 1 },
      ]
    },
    {
      id: 9,
      text: "你更想要的安全感来自？",
      options: [
        { label: "资源和规则", value: "Beijing", weight: 1 },
        { label: "秩序和边界", value: "Shanghai", weight: 1 },
        { label: "熟悉感", value: "Xian", weight: 1 },
        { label: "情绪连接", value: "Chengdu", weight: 1 },
      ]
    },
    {
      id: 10,
      text: "如果工作不顺，你更可能？",
      options: [
        { label: "咬牙换赛道", value: "Shenzhen", weight: 1 },
        { label: "调整节奏", value: "Hangzhou", weight: 1 },
        { label: "先照顾好生活", value: "Guangzhou", weight: 1 },
        { label: "找朋友发泄", value: "Chongqing", weight: 1 },
      ]
    },
    // ... Q11-Q20 (简化版，实际开发时补全30题)
    {
      id: 11,
      text: "你更喜欢的城市气质是？",
      options: [
        { label: "强大", value: "Beijing", weight: 1 },
        { label: "干净", value: "Shanghai", weight: 1 },
        { label: "真实", value: "Wuhan", weight: 1 },
        { label: "热烈", value: "Chongqing", weight: 1 },
      ]
    },
    {
      id: 12,
      text: "你对“历史感”的态度？",
      options: [
        { label: "实用优先", value: "Shenzhen", weight: 1 },
        { label: "当作背景", value: "Nanjing", weight: 1 },
        { label: "有就挺好", value: "Hangzhou", weight: 1 },
        { label: "很重要", value: "Xian", weight: 1 },
      ]
    },
    {
      id: 13,
      text: "你更容易被哪种生活打动？",
      options: [
        { label: "大项目、大平台", value: "Beijing", weight: 1 },
        { label: "高质量日常", value: "Suzhou", weight: 1 },
        { label: "烟火气", value: "Guangzhou", weight: 1 },
        { label: "情绪释放", value: "Changsha", weight: 1 },
      ]
    },
    {
      id: 14,
      text: "你对社交的真实需求是？",
      options: [
        { label: "有价值连接", value: "Shenzhen", weight: 1 },
        { label: "低频高质量", value: "Shanghai", weight: 1 },
        { label: "熟人稳定", value: "Nanjing", weight: 1 },
        { label: "多、热闹", value: "Chengdu", weight: 1 },
      ]
    },
    {
      id: 15,
      text: "你更像哪种人？",
      options: [
        { label: "长线规划型", value: "Beijing", weight: 1 },
        { label: "自律边界型", value: "Shanghai", weight: 1 },
        { label: "随遇而安型", value: "Guangzhou", weight: 1 },
        { label: "情绪驱动型", value: "Chongqing", weight: 1 },
      ]
    },
    // ... 为了演示完整流程，这里先只列出部分题目，实际应完整录入30题
    // 省略中间题目以避免过长，逻辑一致
    {
      id: 30,
      text: "如果只能选一句？",
      options: [
        { label: "我想往上走", value: "Beijing", weight: 2 },
        { label: "我想过得体面", value: "Shanghai", weight: 2 },
        { label: "我想活得轻松", value: "Chengdu", weight: 2 },
        { label: "我想活得痛快", value: "Chongqing", weight: 2 },
      ]
    }
  ],
  results: [
    {
      id: "Beijing",
      title: "北京｜资源密度型城市",
      description: "你适合这里，如果你能承压换资源，看重长期上限。",
      cityDimensions: {
        cityTemperament: "规则 > 情绪：以规则、体系和资源密度运转，不擅长照顾情绪，但路径清晰。",
        lifePace: "阶段性高压：呈现“冲刺—缓冲”的节奏，更适合能承受周期性压力的人。",
        workStyle: "长线回报：资源集中、上限高，适合延迟满足型发展。",
        socialStyle: "功能型连接：关系多由目标和事务建立，清晰但不温情。",
        emotionalExp: "容易紧绷：对情绪敏感者消耗感明显。"
      },
      fitFor: ["能承压换资源", "看重长期上限", "不依赖情绪环境"]
    },
    {
      id: "Shanghai",
      title: "上海｜秩序与边界型城市",
      description: "你适合这里，如果你重视边界，讨厌混乱，对生活品质敏感。",
      cityDimensions: {
        cityTemperament: "体面、专业、克制：强调边界、规则和“合不合适”。",
        lifePace: "稳定可控：不慢，但很少混乱。",
        workStyle: "专业优先：重视能力、可靠度和长期表现。",
        socialStyle: "低频高质量：关系不密集，但稳定清晰。",
        emotionalExp: "安全但偏冷：舒适、不冒犯，但情绪连接感较弱。"
      },
      fitFor: ["重视边界", "讨厌混乱", "对生活品质敏感"]
    },
    {
      id: "Shenzhen",
      title: "深圳｜速度与试错型城市",
      description: "你适合这里，如果你接受不确定性，行动大于情绪。",
      cityDimensions: {
        cityTemperament: "年轻、直接、结果导向：不问背景，看你能做到什么。",
        lifePace: "持续高速：变化快，城市整体在向前跑。",
        workStyle: "效率与试错：容错高，但节奏快。",
        socialStyle: "项目型连接：关系建立快，消散也快。",
        emotionalExp: "兴奋但不稳定：容易被推动，也容易疲惫。"
      },
      fitFor: ["接受不确定性", "行动大于情绪"]
    },
    {
      id: "Guangzhou",
      title: "广州｜松弛实用型城市",
      description: "你适合这里，如果你重视生活本身，不想被野心裹挟。",
      cityDimensions: {
        cityTemperament: "务实、不紧绷：强调日子怎么过，而不是如何成功。",
        lifePace: "工作生活分离：下班后是真生活。",
        workStyle: "实用导向：不迷信头衔，重实际价值。",
        socialStyle: "自然随和：关系不端着，靠相处。",
        emotionalExp: "松弛感强：不容易被城市推着焦虑。"
      },
      fitFor: ["重视生活本身", "不想被野心裹挟"]
    },
    {
      id: "Chengdu",
      title: "成都｜生活感与情绪缓冲型城市",
      description: "你适合这里，如果你容易被压力影响，重视情绪稳定。",
      cityDimensions: {
        cityTemperament: "松弛、有温度：强调生活体验和情绪感受。",
        lifePace: "慢但不消极：不给自己过度压力。",
        workStyle: "稳定优先：不追极端效率。",
        socialStyle: "情绪连接：关系建立在陪伴与感受上。",
        emotionalExp: "被接住：对情绪非常友好。"
      },
      fitFor: ["容易被压力影响", "重视情绪稳定"]
    },
    {
      id: "Hangzhou",
      title: "杭州｜平衡与宜居型城市",
      description: "你适合这里，如果你追求平衡，不想走极端路线。",
      cityDimensions: {
        cityTemperament: "克制的上进：既有机会，也留生活。",
        lifePace: "张弛有度：适合长期发展。",
        workStyle: "平台 + 宜居：适合想前进但不极端的人。",
        socialStyle: "温和理性：不密集，也不冷漠。",
        emotionalExp: "稳定不过载：情绪波动小。"
      },
      fitFor: ["追求平衡", "不想走极端路线"]
    },
    {
      id: "Nanjing",
      title: "南京｜稳态发展型城市",
      description: "你适合这里，如果你不爱折腾，重视长期安全感。",
      cityDimensions: {
        cityTemperament: "中庸、克制：不追风口，也不激进。",
        lifePace: "长期稳定：适合慢慢扎根。",
        workStyle: "耐心型发展：强调积累而非爆发。",
        socialStyle: "熟人稳定：不热闹，但可靠。",
        emotionalExp: "心态平衡：不容易被外界拉扯。"
      },
      fitFor: ["不爱折腾", "重视长期安全感"]
    },
    {
      id: "Wuhan",
      title: "武汉｜真实与烟火型城市",
      description: "你适合这里，如果你喜欢真实环境，不擅长精致社交。",
      cityDimensions: {
        cityTemperament: "真实、不端着：有情绪，但不矫饰。",
        lifePace: "有快有慢：不精致，但很生活。",
        workStyle: "接地气：机会多样，不包装。",
        socialStyle: "容易融入：人情味浓。",
        emotionalExp: "情绪浓度高：直接、不压抑。"
      },
      fitFor: ["喜欢真实环境", "不擅长精致社交"]
    },
    {
      id: "Xian",
      title: "西安｜底蕴与耐心型城市",
      description: "你适合这里，如果你有耐心，不追即时反馈。",
      cityDimensions: {
        cityTemperament: "厚重、时间感强：强调积累而非速度。",
        lifePace: "偏慢：适合沉下心生活。",
        workStyle: "稳定导向：不追新，但稳。",
        socialStyle: "熟人逻辑：建立慢，但持久。",
        emotionalExp: "踏实：不浮躁。"
      },
      fitFor: ["有耐心", "不追即时反馈"]
    },
    {
      id: "Chongqing",
      title: "重庆｜情绪释放型城市",
      description: "你适合这里，如果你情绪浓度高，不喜欢压抑。",
      cityDimensions: {
        cityTemperament: "热烈、江湖感：情绪浓度高。",
        lifePace: "白天工作，晚上生活：夜晚很重要。",
        workStyle: "现实直接：不太讲包装。",
        socialStyle: "高密度：人情味重。",
        emotionalExp: "释放感强：适合需要出口的人。"
      },
      fitFor: ["情绪浓度高", "不喜欢压抑"]
    },
    {
      id: "Suzhou",
      title: "苏州｜低调高质量型城市",
      description: "你适合这里，如果你喜欢安稳，不追求刺激。",
      cityDimensions: {
        cityTemperament: "安静、稳定：不张扬，但很稳。",
        lifePace: "规律：边界清晰。",
        workStyle: "稳定优先：适合长期定居。",
        socialStyle: "少而稳：不热闹，但可靠。",
        emotionalExp: "低波动：不容易焦虑。"
      },
      fitFor: ["喜欢安稳", "不追求刺激"]
    },
    {
      id: "Changsha",
      title: "长沙｜快乐与年轻型城市",
      description: "你适合这里，如果你重视当下快乐，不想活得太紧。",
      cityDimensions: {
        cityTemperament: "情绪友好：快乐优先。",
        lifePace: "轻松、偏夜生活：不急着成功。",
        workStyle: "灵活：路径不唯一。",
        socialStyle: "热闹、易连接：社交成本低。",
        emotionalExp: "高情绪价值：开心很重要。"
      },
      fitFor: ["重视当下快乐", "不想活得太紧"]
    }
  ]
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
        title: "白茶型人格 ",
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
  // 插入城市匹配测试
  cityTest,
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
];
