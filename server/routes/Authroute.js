const express  = require('express')
const {register,login,getUserProfile, updateProfile, logout,createUser}  = require('../controller/user.controller.js')
const isAuthenticated  = require('../middlewares/isAuthenticated.js')
const upload = require('../utils/multer.js')
const { createCourse,getCreatorCourses, editCourse, getCourseById,createLecture, getCourseLecture, editLecture, removeLecture, getLectureById, togglePublishCourse,getPublishedCourse, searchCourse } = require('../controller/course.controller.js')
const router  = express.Router()
router.post('/registration',register)
router.get('/search',isAuthenticated,searchCourse)
router.post('/createuser',createUser)
router.get('/',getPublishedCourse)
router.post('/create',isAuthenticated,createCourse)
router.get('/getcourse',isAuthenticated,getCreatorCourses)
router.get('/getcourse/:courseId',isAuthenticated,getCourseById)
router.post('/:courseId/lecture',isAuthenticated,createLecture)
router.get('/:courseId/lecture',isAuthenticated,getCourseLecture)
router.put('/:courseId',isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.post('/login',login)
router.get('/logout',logout)
router.get('/profile',isAuthenticated,getUserProfile)
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
module.exports = router