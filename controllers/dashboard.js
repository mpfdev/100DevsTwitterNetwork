const Post = require('../models/Post')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const allPosts = await Post.find()

      res.render('./pages/profile-dashboard.ejs', {
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user
      })
    } catch (err) {
      console.log(err)
    }
  },

  getIndex: async (req, res) => {
    try {
      const allPosts = await Post.find()

      res.render('./pages/dashboard.ejs', {
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user
      })
    } catch (err) {
      console.log(err)
    }
  },

  createPost: async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        postMessage: req.body.newPost,
        userId: req.user.id,
        userName: req.user.userName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        likes: 0,
      })
      console.log('post was created')
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({ _id: req.body.postIdFromJSFile })
      // Delete image from cloudinary
      cloudinary.uploader.destroy(post.cloudinaryId);
      console.log('Deleted Post')
      res.json('Deleted Post')
    } catch (err) {
      console.log(err)
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id }, {
        $inc: { likes: 1 }
      })
      console.log('Likes +1')
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
}