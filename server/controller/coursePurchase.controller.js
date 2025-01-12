const Stripe = require("stripe");
// const { Course } = require("../models/course.model.js");
// const { CoursePurchase } = require("../models/coursePurchase.model.js");
const Course = require("../models/course.model.js");
const { CoursePurchase } = require("../models/coursePurchase.model.js");
const User = require("../models/user.model.js");
const stripe = new Stripe("sk_test_51QgJqmFPKYQHi6PnHqQhTjJp1aZMpkMA7WJegLc2wztU9z42SEwlTKz9nhPTOhUsT4yke7YPbGCRO7q97OGzHU8H005Ng1Z0Uz");

const createCheckoutSession = async (req, res) => {
  try {
    // Extract user ID and course ID from the request
    const userId = req.id;
    const { courseId } = req.body;


    // Debugging: Ensure courseId is being passed correctly
    console.log("Course ID backend:", courseId);

    // Fetch the course details from the database
    const course = await Course.findById(courseId).catch((err) => {
      console.error("Error fetching course:", err);
    });
console.log("course",course);

    // Handle course not found
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Create a new purchase record in the database (status is initially "pending")
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });
console.log(newPurchase);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/profile`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    // Handle session creation failure
    if (!session.url) {
      return res.status(400).json({
        success: false,
        message: "Error while creating session",
      });
    }

   const user  =await  User.findById(userId)
   user.enrolledCourses.push(courseId)
   await user.save()
   course.enrolledStudents.push(userId)
    await course.save()
    newPurchase.paymentId = session.id;
    await newPurchase.save();
    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

 const getPurchasedCourse  = async (req, res) => {
    // const courseId = req.params.courseId;
    // const userId = req.id;
    const course = await CoursePurchase.find({ userId: "6783d181e9db30545793fbfe" })
    .populate({
      path: "courseId", // Populate courseId field
      select: "courseTitle courseThumbnail coursePrice",
      populate: {
        path: "lectures", // Populate lectures within the course
        select: "lectureTitle videoUrl"
      }
    });
    // .find({  userId:""})
 

 if (!course) {
    return res.status(404).json({ message: "Course not found!" });
 }
    return res.status(200).json({ course });
 }
module.exports = {
  createCheckoutSession,
  getPurchasedCourse
};
