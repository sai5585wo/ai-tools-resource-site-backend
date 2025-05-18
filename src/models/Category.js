const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  },
  hasSubmenu: {
    type: Boolean,
    default: false
  },
  submenu: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Category', categorySchema); 