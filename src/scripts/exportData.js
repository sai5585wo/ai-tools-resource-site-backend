require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const Tool = require('../models/Tool');
const Category = require('../models/Category');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/ai-tools', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const exportData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Fetch all data
    const categories = await Category.find({});
    const tools = await Tool.find({});

    // Create export directory if it doesn't exist
    const exportDir = path.join(__dirname, 'exports');
    await fs.mkdir(exportDir, { recursive: true });

    // Export categories
    await fs.writeFile(
      path.join(exportDir, 'categories.json'),
      JSON.stringify(categories, null, 2),
      'utf8'
    );
    console.log('Categories exported successfully');

    // Export tools
    await fs.writeFile(
      path.join(exportDir, 'tools.json'),
      JSON.stringify(tools, null, 2),
      'utf8'
    );
    console.log('Tools exported successfully');

    console.log('All data exported successfully to', exportDir);
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
};

// Run the export
exportData(); 