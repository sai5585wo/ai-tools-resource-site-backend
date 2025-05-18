const express = require('express');
const router = express.Router();
const {
  getAllTools,
  getToolsByCategory,
  searchTools,
  createTool,
  updateTool,
  deleteTool
} = require('../controllers/toolController');

// 获取所有工具
router.get('/', getAllTools);

// 按分类获取工具
router.get('/category/:category', getToolsByCategory);

// 搜索工具
router.get('/search', searchTools);

// 创建新工具
router.post('/', createTool);

// 更新工具
router.put('/:id', updateTool);

// 删除工具
router.delete('/:id', deleteTool);

module.exports = router; 