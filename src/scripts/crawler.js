const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const Category = require('../models/Category');

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ai-tools', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// 定义数据源
const sources = [
  {
    name: 'futurepedia',
    url: 'https://www.futurepedia.io',
    parser: async (html) => {
      const $ = cheerio.load(html);
      const tools = [];
      
      // 解析页面获取工具信息
      $('.tool-card').each((i, elem) => {
        const tool = {
          title: $(elem).find('.tool-title').text().trim(),
          description: $(elem).find('.tool-description').text().trim(),
          tags: [],
          icon: '🤖', // 默认图标
          url: $(elem).find('.tool-link').attr('href'),
          category: $(elem).find('.tool-category').text().trim(),
        };
        tools.push(tool);
      });
      
      return tools;
    }
  },
  // 可以添加更多数据源
];

// 爬取数据
const crawlData = async () => {
  try {
    await connectDB();
    
    for (const source of sources) {
      console.log(`Crawling data from ${source.name}...`);
      const response = await axios.get(source.url);
      const tools = await source.parser(response.data);
      
      // 保存到数据库
      for (const tool of tools) {
        const existingTool = await Tool.findOne({ title: tool.title });
        if (!existingTool) {
          await Tool.create(tool);
          console.log(`Added new tool: ${tool.title}`);
        } else {
          // 更新现有工具
          Object.assign(existingTool, tool);
          existingTool.lastUpdated = new Date();
          await existingTool.save();
          console.log(`Updated tool: ${tool.title}`);
        }
      }
    }
    
    console.log('Data crawling completed');
    process.exit(0);
  } catch (error) {
    console.error('Error crawling data:', error);
    process.exit(1);
  }
};

// 运行爬虫
crawlData(); 