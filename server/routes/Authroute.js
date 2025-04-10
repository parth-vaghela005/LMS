const express  = require('express')
const {register,login,getUserProfile, updateProfile, logout,createUser}  = require('../controller/user.controller.js')
const isAuthenticated  = require('../middlewares/isAuthenticated.js')
const upload = require('../utils/multer.js')
const { createCourse,getCreatorCourses, editCourse, getCourseById,createLecture, getCourseLecture, editLecture, removeLecture, getLectureById, togglePublishCourse,getPublishedCourse, searchCourse, initiatePurchase, simulatePaymentWithCard, Payment } = require('../controller/course.controller.js')
// const { payment } = require('../controller/payment.js')
const { createCheckoutSession, getPurchasedCourse } = require('../controller/coursePurchase.controller.js')
const { createReview, getReviews } = require('../controller/review.controller.js')
const { CreateTest, GetTestbyId } = require('../controller/test.controller.js')
const { CheckAns } = require('../controller/result.controller.js')
const { getCourseProgress, updateLectureProgress, markAsCompleted, markAsInCompleted } = require('../controller/courseProgress.controller.js')
const router  = express.Router()
router.post('/registration',register)
router.post('/lecture/:lectureId/test',CreateTest)
router.post('/reviews/:courseId',isAuthenticated,createReview)
router.post('/check',isAuthenticated,CheckAns)
// router.post('/direct-payment',Payment)
router.post('/create-checkout-session',isAuthenticated,createCheckoutSession)
// router.post('/initiate', initiatePurchase);
// router.post('/simulate-payment-with-card', simulatePaymentWithCard);
router.route("/progress/course/:courseId").get(isAuthenticated, getCourseProgress);
// router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated, updateLectureProgress);
// router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
// router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);
router.get('/search',isAuthenticated,searchCourse)
router.get('/quize/:Id',GetTestbyId)
router.get('/purchased',isAuthenticated,getPurchasedCourse)
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
router.route("/lecture/:lectureId").get( getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
router.get('/reviews/:courseId',getReviews)
// router.route("/payment").post(isAuthenticated, payment); 
module.exports = router