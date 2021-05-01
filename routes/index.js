const express = require('express')
const router = express.Router()
const passport = require('passport')
const indexController = require('../controllers/index')
const authController = require('../controllers/auth')
const { ensureGuest } = require('../middleware/auth')

//Index Page
router.get('/', ensureGuest, indexController.getIndex)

//Register Page
router.get('/register', ensureGuest, indexController.getRegister)
router.post('/register', authController.postRegister)

//Login Page
router.get('/login', ensureGuest, indexController.getLogin)
router.post('/login', authController.postLogin)

//Logout Page
router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
})

module.exports = router