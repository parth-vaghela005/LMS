const express  = require('express')
const {register,login,getUserProfile, updateProfile}  = require('../controller/user.controller.js')
const isAuthenticated  = require('../middlewares/isAuthenticated.js')
const upload = require('../utils/multer.js')
const router  = express.Router()
router.post('/registration',register)
router.post('/login',login)
router.get('/profile',isAuthenticated,getUserProfile)
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
module.exports = router