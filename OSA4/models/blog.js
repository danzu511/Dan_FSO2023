const mongoose = require('mongoose')

// Define the blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0, // Default value for likes is 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Blog', blogSchema)
