const express  = require('express')
const {register,login,getUserProfile}  = require('../controller/user.controller.js')
const isAuthenticated  = require('../middlewares/isAuthenticated.js')
const router  = express.Router()
router.post('/registration',register)
router.post('/login',login)
router.get('/profile',isAuthenticated,getUserProfile)
module.exports = router