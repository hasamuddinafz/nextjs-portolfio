const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the parent category
    ref: 'Category' // Reference to the Category collection
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Check if the model already exists before defining it
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
