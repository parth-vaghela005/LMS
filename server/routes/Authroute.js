const express  = require('express')
const {register,login,getUserProfile, updateProfile, logout}  = require('../controller/user.controller.js')
const isAuthenticated  = require('../middlewares/isAuthenticated.js')
const upload = require('../utils/multer.js')
const { createCourse } = require('../controller/course.controller.js')
const router  = express.Router()
router.post('/registration',register)
router.post('/add-course',isAuthenticated,createCourse)
router.post('/login',login)
router.get('/logout',logout)
router.get('/profile',isAuthenticated,getUserProfile)
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
module.exports = router