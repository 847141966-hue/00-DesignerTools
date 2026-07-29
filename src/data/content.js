// ========================================
// 网站内容数据 — 请替换为你的真实信息
// ========================================

export const profile = {
  name: '你的名字',
  nameEn: 'YOUR NAME',
  title: '视觉斗士',
  titleEn: 'VISUAL FIGHTER',
  tagline: '用设计战斗的创作者',
  taglineEn: 'Design is my weapon. Art is my battlefield.',
  level: 5,
  levelLabel: '从业年限',
  avatar: null, // 替换为你的头像路径，如 '/avatar.jpg'
  bio: '一名热爱视觉设计与插画创作的斗士。在设计的擂台上，每一件作品都是一场战斗——与平庸战斗，与枯燥战斗，与理所当然战斗。用画笔和像素，打出属于自己的连招。',
  skills: [
    { name: 'UI 设计', level: 90 },
    { name: '插画', level: 85 },
    { name: '品牌设计', level: 80 },
    { name: '动效设计', level: 75 },
  ],
  tags: ['UI设计', '插画', '品牌设计', '动效', 'C4D', 'Figma'],
}

export const projects = [
  {
    id: 1,
    title: '赛博东方品牌视觉',
    category: 'design',
    cover: 'gradient-1',
    description: '将传统东方美学与赛博朋克风格融合的品牌视觉系统设计。以霓虹色彩重新诠释水墨意境，打造跨时代的视觉语言。',
    tags: ['品牌设计', '视觉系统', '赛博朋克'],
    year: '2024',
    color: '#FF6B35',
  },
  {
    id: 2,
    title: '深渊回响插画系列',
    category: 'illustration',
    cover: 'gradient-2',
    description: '以深海为灵感的系列插画作品。探索光与暗的边界，用色彩讲述深渊中无声的故事。每一幅都是一次潜入未知的旅程。',
    tags: ['插画', '数字艺术', '概念设计'],
    year: '2024',
    color: '#08D9D6',
  },
  {
    id: 3,
    title: '格斗祭 App 设计',
    category: 'design',
    cover: 'gradient-3',
    description: '为格斗游戏社区设计的移动应用。以街机美学为基调，融合现代 UI 规范，打造沉浸式的社区体验。',
    tags: ['UI设计', 'App', '游戏社区'],
    year: '2023',
    color: '#F9C80E',
  },
  {
    id: 4,
    title: '墨兽图鉴',
    category: 'illustration',
    cover: 'gradient-4',
    description: '以中国传统水墨风格绘制奇幻异兽图鉴。每一只墨兽都是笔锋与想象力的碰撞，在纸上苏醒。',
    tags: ['插画', '水墨', '奇幻'],
    year: '2023',
    color: '#FF6B35',
  },
  {
    id: 5,
    title: 'NEON 数据仪表盘',
    category: 'design',
    cover: 'gradient-5',
    description: '为数据分析平台设计的暗色系仪表盘界面。以信息层级为核心，用霓虹色强调关键数据，兼顾美观与效率。',
    tags: ['UI设计', '数据可视化', 'Dashboard'],
    year: '2023',
    color: '#08D9D6',
  },
  {
    id: 6,
    title: '星尘旅人角色设计',
    category: 'illustration',
    cover: 'gradient-6',
    description: '原创科幻 IP 的角色设计系列。每个角色都有独特的背景故事和视觉符号，在星尘中寻找自己的归宿。',
    tags: ['角色设计', '概念艺术', '科幻'],
    year: '2022',
    color: '#F9C80E',
  },
]

export const experiences = [
  {
    round: '01',
    period: '2023 — 至今',
    org: '独立创作者 / Freelance',
    role: '视觉设计师 & 插画师',
    description: '独立承接品牌视觉、插画、UI 设计项目。在自由中磨砺锋芒，每一单都是一场新的战斗。',
    skills: ['品牌设计', '插画', 'UI设计', '客户沟通'],
    achievement: '完成 30+ 商业项目',
  },
  {
    round: '02',
    period: '2021 — 2023',
    org: '某创意设计公司',
    role: '高级视觉设计师',
    description: '负责品牌视觉系统设计与推广物料创意。从概念到落地，主导多个大型品牌升级项目。',
    skills: ['品牌升级', '团队协作', '项目管理', '视觉系统'],
    achievement: '主导 5 个品牌升级项目',
  },
  {
    round: '03',
    period: '2019 — 2021',
    org: '某互联网公司',
    role: 'UI 设计师',
    description: '负责产品界面设计与用户体验优化。在数据与美学的交汇处寻找最优解。',
    skills: ['UI设计', '用户体验', '设计系统', '交互设计'],
    achievement: '设计系统覆盖 10+ 产品线',
  },
  {
    round: '04',
    period: '2015 — 2019',
    org: '某美术学院',
    role: '视觉传达设计 · 学士',
    description: '四年系统学习视觉传达、色彩理论、版式设计。在传统与现代之间打下坚实的基本功。',
    skills: ['素描', '色彩', '版式设计', '平面构成'],
    achievement: '毕业设计获优秀作品奖',
  },
]

export const contact = {
  email: 'your-email@example.com',
  wechat: '你的微信号',
  socials: [
    { name: 'GitHub', url: 'https://github.com/847141966-hue', icon: 'github' },
    { name: '站酷', url: '#', icon: 'palette' },
  ],
}

export const navItems = [
  { id: 'hero', label: '开场', labelEn: 'HERO' },
  { id: 'about', label: '关于', labelEn: 'ABOUT' },
  { id: 'projects', label: '作品', labelEn: 'WORKS' },
  { id: 'experience', label: '经历', labelEn: 'RECORD' },
  { id: 'contact', label: '联系', labelEn: 'CONNECT' },
]
