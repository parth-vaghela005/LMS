const mongoose = require("mongoose");

// Define the Review schema
const reviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Assuming you have a Course model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1, //nimum rating is 1 star
    max: 5  // Maximum rating is 5 stars/ Mi
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500 // Limit description to 500 characters
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure a user can review a course only once
reviewSchema.index({ courseId: 1, userId: 1 }, { unique: true });
// Export the Review model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
