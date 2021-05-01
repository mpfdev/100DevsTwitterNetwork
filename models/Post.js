const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  postMessage: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  }
})

module.exports = mongoose.model('Post', PostSchema)