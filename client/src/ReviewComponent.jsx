"use client"; // Required for Shadcn UI components

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [desc, setDesc] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { courseId } = useParams(); // Get course ID from URL

  // Fetch reviews (Optimized with useCallback)
  const fetchReviews = useCallback(async () => {
    if (!courseId) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/auth/reviews/${courseId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Handle review submission
  const submitHandler = async () => {
    if (!rating || !desc.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/v1/auth/reviews/${courseId}`, {
        rating,
        description: desc,
      },
      {
        withCredentials: true, // Allows cookies & authentication headers to be sent
      }
    )
      

      alert("Review submitted successfully!");
      setDesc(""); // Reset textarea
      setRating(0); // Reset rating
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Star Rating */}
      <div className="mb-4">
        <ReactStars
          count={5}
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          size={30}
          activeColor="#ffd700"
        />
      </div>

      {/* Review Textarea */}
      <Textarea
        placeholder="Write your review..."
        className="mb-4 w-full sm:w-3/4 lg:w-1/2"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      {/* Submit Button */}
      <Button onClick={submitHandler} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>

      {/* Show All Reviews Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="mt-4">
            Show All Reviews
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[400px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Reviews</DialogTitle>
            <DialogDescription>Here are all the reviews for this course.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.userId?.photoUrl || "https://via.placeholder.com/50"}
                      alt={review.userId?.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{review.userId?.name || "Anonymous"}</p>
                      <ReactStars count={5} value={review.rating} edit={false} size={20} activeColor="#ffd700" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{review.description}</p>
                </div>
              ))
            ) : (
              <div className="border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <img src="https://via.placeholder.com/50" alt="John Doe" width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-medium">John Doe</p>
                    <ReactStars count={5} value={4} edit={false} size={20} activeColor="#ffd700" />
                  </div>
                </div>
                <p className="mt-2 text-sm">Great course! Very informative and well-structured.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewComponent;
