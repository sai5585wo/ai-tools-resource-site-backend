const Tool = require('../models/Tool');

// 获取所有工具
exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 按分类获取工具
exports.getToolsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const tools = await Tool.find({ category });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 搜索工具
exports.searchTools = async (req, res) => {
  try {
    const { query } = req.query;
    const tools = await Tool.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 创建新工具
exports.createTool = async (req, res) => {
  try {
    const tool = new Tool(req.body);
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 更新工具
exports.updateTool = async (req, res) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findByIdAndUpdate(id, req.body, { new: true });
    if (!tool) {
      return res.status(404).json({ message: '工具不存在' });
    }
    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 删除工具
exports.deleteTool = async (req, res) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findByIdAndDelete(id);
    if (!tool) {
      return res.status(404).json({ message: '工具不存在' });
    }
    res.json({ message: '工具已删除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 