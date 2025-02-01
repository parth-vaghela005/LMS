const Review = require("../models/review.model.js");

const createReview = async (req, res) => {
  try {
    const { rating, description } = req.body;
    const courseId = req.params.courseId;
    const userId = req.id;
console.log("courseId",courseId);
console.log("userId",userId);
console.log(rating,"rating");
console.log(description,"description");


    // Validation checks
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required." });
    }

    const newReview = await Review.create({
      courseId,
      userId,
      rating,
      description,
    });

    res.status(201).json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "You have already reviewed this course." });
    } else {
      res.status(500).json({ message: "Error creating review", error });
    }
  }
};
module.exports = {
  createReview
};
