const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/ai_news_resource', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误:'));
db.once('open', () => {
  console.log('已连接到 MongoDB');
});

// 示例模型
const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});
const News = mongoose.model('News', NewsSchema);

// 示例路由
app.get('/api/news', async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
});

app.post('/api/news', async (req, res) => {
  const news = new News(req.body);
  await news.save();
  res.json(news);
});

app.get('/', (req, res) => {
  res.send('AI News & Resource Backend Running');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`后端服务已启动，端口 ${PORT}`);
}); 