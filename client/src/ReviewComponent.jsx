"use client"; // Required for Shadcn UI components

import { useState } from "react";
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
import { Star } from "lucide-react";

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle star rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };

  // Handle review submission
  const handleReviewSubmit = () => {
    if (rating > 0 && reviewText.trim() !== "") {
      const newReview = { rating, reviewText };
      setReviews([...reviews, newReview]);
      setRating(0);
      setReviewText("");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            className={`w-6 h-6 cursor-pointer ${
              value <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleRatingClick(value)}
          />
        ))}
      </div>

      {/* Review Textarea */}
      <Textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="mb-4 w-full sm:w-3/4 lg:w-1/2"
      />

      {/* Submit Button */}
      <Button onClick={handleReviewSubmit}>Submit Review</Button>

      {/* Show All Reviews Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="mt-4">
            Show All Reviews
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>All Reviews</DialogTitle>
            <DialogDescription>Here are all the reviews for this course.</DialogDescription>
          </DialogHeader>

          {/* Display Reviews */}
          <div className="mt-4 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={`w-4 h-4 ${
                          value <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">{review.reviewText}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewComponent;