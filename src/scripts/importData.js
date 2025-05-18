require('dotenv').config();
const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const Category = require('../models/Category');

// 分类数据
const categories = [
  { 
    name: '最新推荐', 
    icon: '🏠'
  },
  { 
    name: 'AI绘画', 
    icon: '🎨', 
    hasSubmenu: true,
    submenu: ['热门推荐', '图片清晰放大', '抠图背景去除', '电商图片生成', '图片模糊变清晰', 'LOGO生成']
  },
  { 
    name: 'AI写作', 
    icon: '✍️', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI论文', 'AI内容检测', 'AI小说写作', 'AI文本摘要', 'AI公文写作']
  },
  { 
    name: 'AI视频', 
    icon: '🎥', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI换脸', '视频转动漫', '对口型视频', 'AI自动剪辑']
  },
  { 
    name: 'AI办公', 
    icon: '💼', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI制作PPT', 'AI文档助手', 'AI表格处理', 'AI思维导图']
  },
  { 
    name: 'AI聊天', 
    icon: '💬', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI虚拟角色', 'AI智能客服']
  },
  { 
    name: 'AI编程', 
    icon: '💻',
    hasSubmenu: true,
    submenu: ['热门推荐', '代码生成', '代码补全', '代码转换', '代码优化']
  },
  { 
    name: 'AI音频', 
    icon: '🎵', 
    hasSubmenu: true,
    submenu: ['热门推荐', '文本到语音', 'AI作曲', 'AI语音克隆']
  },
  { 
    name: 'AI提示词', 
    icon: '💡',
    hasSubmenu: true,
    submenu: ['热门推荐', '绘画提示词', '写作提示词', '视频提示词']
  },
  { 
    name: 'AI设计', 
    icon: '🎯',
    hasSubmenu: true,
    submenu: ['热门推荐', 'UI设计', 'Logo设计', '海报设计', '品牌设计']
  },
  { 
    name: 'AI数字人', 
    icon: '👤',
    hasSubmenu: true,
    submenu: ['热门推荐', '数字人生成', '数字人定制', '数字人直播']
  },
  { 
    name: 'AI插件', 
    icon: '🔌',
    hasSubmenu: true,
    submenu: ['热门推荐', '浏览器插件', '设计插件', '办公插件']
  }
];

// 工具数据
const tools = [
  // 最新推荐
  {
    title: 'Midjourney',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion 3',
    description: '新一代文本到图像生成AI模型',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🖼️',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://stability.ai'
  },
  {
    title: 'Claude 3',
    description: 'Anthropic 最新发布的AI助手，支持多模态输入',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🤖',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI开发的AI对话模型',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💬',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: 'GitHub Copilot',
    description: 'AI驱动的代码智能助手',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🐙',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://github.com/features/copilot'
  },
  
  // AI绘画分类的工具
  {
    title: 'Midjourney绘画',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion绘画',
    description: '新一代文本到图像生成AI模型',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🖼️',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://stability.ai'
  },
  {
    title: '文心一格',
    description: '百度开发的AI艺术与创意平台',
    tags: [
      { text: '免费', type: 'free' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '✨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://yige.baidu.com'
  },

  // AI写作分类工具
  {
    title: 'ChatGPT写作',
    description: 'OpenAI开发的AI写作助手，支持多种写作场景',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '✍️',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: '写作猫',
    description: '中文AI写作助手，支持多种文体和场景',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '📝',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://xiezuocat.com'
  },
  {
    title: '秘塔写作',
    description: '专业的AI论文写作和润色工具',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '📚',
    category: 'AI写作',
    subCategory: 'AI论文',
    url: 'https://metaso.cn'
  },

  // AI视频分类工具
  {
    title: 'Runway',
    description: '专业的AI视频生成和编辑平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎥',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://runway.ml'
  },
  {
    title: 'Synthesia',
    description: 'AI数字人视频生成平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎬',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://www.synthesia.io'
  },
  {
    title: 'HeyGen',
    description: 'AI数字人视频制作平台',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎭',
    category: 'AI视频',
    subCategory: 'AI换脸',
    url: 'https://www.heygen.com'
  },

  // AI办公分类工具
  {
    title: 'Microsoft Copilot',
    description: '微软推出的AI办公助手，集成Office全家桶',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💼',
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://copilot.microsoft.com'
  },
  {
    title: 'Notion AI',
    description: 'Notion集成的AI助手，提升笔记和写作效率',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '📝',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://notion.ai'
  },
  {
    title: 'Beautiful.ai',
    description: 'AI驱动的智能PPT设计工具',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎯',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://www.beautiful.ai'
  },

  // AI聊天分类工具
  {
    title: 'Character.ai',
    description: '创建和与AI角色对话的平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🗣️',
    category: 'AI聊天',
    subCategory: 'AI虚拟角色',
    url: 'https://character.ai'
  },
  {
    title: 'Claude Chat',
    description: 'Anthropic开发的AI助手，擅长学术和专业对话',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🤖',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://claude.ai'
  },
  {
    title: '智谱清言',
    description: '智谱AI开发的中文大语言模型对话产品',
    tags: [
      { text: '免费', type: 'free' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '💭',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://chatglm.cn'
  },

  // AI编程分类工具
  {
    title: 'GitHub Copilot代码助手',
    description: 'AI驱动的代码智能助手',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🐙',
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://github.com/features/copilot'
  },
  {
    title: 'Amazon CodeWhisperer',
    description: '亚马逊开发的AI代码助手',
    tags: [
      { text: '免费', type: 'free' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💻',
    category: 'AI编程',
    subCategory: '代码补全',
    url: 'https://aws.amazon.com/codewhisperer'
  },
  {
    title: 'Replit AI',
    description: '在线IDE集成的AI编程助手',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '⚡',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://replit.com'
  },

  // AI音频分类工具
  {
    title: 'Murf AI',
    description: '专业的AI语音生成平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎤',
    category: 'AI音频',
    subCategory: '文本到语音',
    url: 'https://murf.ai'
  },
  {
    title: 'Soundraw',
    description: 'AI音乐创作平台',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎵',
    category: 'AI音频',
    subCategory: 'AI作曲',
    url: 'https://soundraw.io'
  },
  {
    title: 'Voice.ai',
    description: '实时AI语音转换工具',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🗣️',
    category: 'AI音频',
    subCategory: 'AI语音克隆',
    url: 'https://voice.ai'
  },

  // AI提示词分类工具
  {
    title: 'PromptHero',
    description: 'AI绘画提示词分享和探索平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://prompthero.com'
  },
  {
    title: 'MidJourney Prompt Helper',
    description: 'MidJourney提示词助手',
    tags: [
      { text: '免费', type: 'free' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💡',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://prompt.noonshot.com'
  },
  {
    title: 'LearnPrompting',
    description: '提示词工程学习平台',
    tags: [
      { text: '教程', type: 'tutorial' },
      { text: 'EN', type: 'en' }
    ],
    icon: '📚',
    category: 'AI提示词',
    subCategory: '热门推荐',
    url: 'https://learnprompting.org'
  },

  // AI设计分类工具
  {
    title: 'Figma AI',
    description: 'Figma内置的AI设计助手',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: 'AI设计',
    subCategory: 'UI设计',
    url: 'https://www.figma.com/ai'
  },
  {
    title: 'Canva AI',
    description: 'Canva推出的AI设计助手',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎯',
    category: 'AI设计',
    subCategory: '热门推荐',
    url: 'https://www.canva.com'
  },
  {
    title: 'Logoai',
    description: 'AI驱动的logo设计工具',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎯',
    category: 'AI设计',
    subCategory: 'Logo设计',
    url: 'https://www.logoai.com'
  },

  // AI数字人分类工具
  {
    title: 'D-ID',
    description: 'AI数字人视频生成平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '👤',
    category: 'AI数字人',
    subCategory: '热门推荐',
    url: 'https://www.d-id.com'
  },
  {
    title: 'Synthesia数字人平台',
    description: 'AI数字人视频制作平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎬',
    category: 'AI数字人',
    subCategory: '数字人生成',
    url: 'https://www.synthesia.io'
  },
  {
    title: '魔珐科技',
    description: '专业的数字人定制和直播平台',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '🤖',
    category: 'AI数字人',
    subCategory: '数字人直播',
    url: 'https://www.morphaai.com'
  },

  // AI插件分类工具
  {
    title: 'ChatGPT Plugins',
    description: 'ChatGPT官方插件商店',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🔌',
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com/plugins'
  },
  {
    title: 'Merlin',
    description: '随处可用的AI助手浏览器插件',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🧙‍♂️',
    category: 'AI插件',
    subCategory: '浏览器插件',
    url: 'https://merlin.foyer.work'
  },
  {
    title: 'Notion AI插件',
    description: 'Notion集成的AI助手插件',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '📝',
    category: 'AI插件',
    subCategory: '办公插件',
    url: 'https://www.notion.so/product/ai'
  }
];

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// 导入分类数据
const importCategories = async () => {
  try {
    // 清空现有分类数据
    await Category.deleteMany({});
    console.log('已清空现有分类数据');

    // 为每个分类添加序号
    const categoriesWithOrder = categories.map((category, index) => ({
      ...category,
      order: index
    }));

    // 导入新的分类数据
    await Category.insertMany(categoriesWithOrder);
    console.log('分类数据导入成功');
  } catch (error) {
    console.error('导入分类数据时出错:', error);
  }
};

// 导入工具数据
const importTools = async () => {
  try {
    // 清空现有工具数据
    await Tool.deleteMany({});
    console.log('已清空现有工具数据');

    // 导入新的工具数据
    await Tool.insertMany(tools);
    console.log('工具数据导入成功');
  } catch (error) {
    console.error('导入工具数据时出错:', error);
  }
};

// 执行导入
const importData = async () => {
  await connectDB();
  await importCategories();
  await importTools();
  console.log('所有数据导入完成');
  process.exit();
};

importData(); 