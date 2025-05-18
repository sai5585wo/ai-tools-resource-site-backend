const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // 优先使用环境变量中的MongoDB URI，如果没有则使用本地连接
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 