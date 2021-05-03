const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const upload = require('../middleware/multer')
const { ensureAuth } = require('../middleware/auth')

//Homepage
router.get('/', ensureAuth, dashboardController.getIndex)

//Profile Page
router.get('/profile', dashboardController.getProfile)

//New Post
router.post('/createPost', upload.single('file'), dashboardController.createPost)

//Like Post
router.put('/likePost/:id', dashboardController.likePost)

//Delete Post
router.delete('/deletePost', dashboardController.deletePost)

module.exports = router