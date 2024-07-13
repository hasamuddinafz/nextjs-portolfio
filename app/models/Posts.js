const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Ensure this matches the Category model
    required: true,
  },
  tags: [String],
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
