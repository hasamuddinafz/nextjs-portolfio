const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
