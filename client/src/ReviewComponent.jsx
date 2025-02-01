import React, { useState } from "react";
import Rating from "react-rating";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "./components/ui/dialog";
// import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@components/shadcn/ui";

const ReviewComponent = ({ courseId }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/auth/reviews/${courseId}`,
        { withCredentials: true }
      );
      setAllReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!rating || !description.trim()) {
      setErrorMessage("Please provide a rating and description.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/reviews/${courseId}`,
        { rating, description },
        { withCredentials: true }
      );
      setSuccessMessage("Review submitted successfully!");
      setRating(0);
      setDescription("");
      fetchReviews();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while submitting your review.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Course Reviews</h2>

      {allReviews.length > 0 ? (
        <div>
          <h3>User Reviews</h3>
          <div style={{ marginBottom: "20px" }}>
            {allReviews.slice(0, 3).map((review, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{review.userName}</p>
                <Rating
                  initialRating={review.rating}
                  readonly
                  emptySymbol={<span style={{ color: "#ddd" }}>★</span>}
                  fullSymbol={<span style={{ color: "#ffd700" }}>★</span>}
                  style={{ fontSize: "18px" }}
                />
                <p>{review.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setShowDialog(true);
              fetchReviews();
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View All Reviews
          </button>

          <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogHeader>All Reviews</DialogHeader>
            <DialogContent>
              {allReviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{review.userName}</p>
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={<span style={{ color: "#ddd" }}>★</span>}
                    fullSymbol={<span style={{ color: "#ffd700" }}>★</span>}
                    style={{ fontSize: "18px" }}
                  />
                  <p>{review.description}</p>
                </div>
              ))}
            </DialogContent>
            <DialogFooter>
              <button
                onClick={() => setShowDialog(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </DialogFooter>
          </Dialog>
        </div>
      ) : (
        <p>No reviews available.</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Submit Your Review</h3>
        <Rating
          fractions={1}
          initialRating={rating}
          onChange={(value) => setRating(value)}
          emptySymbol={<span style={{ color: "#ddd" }}>★</span>}
          fullSymbol={<span style={{ color: "#ffd700" }}>★</span>}
          style={{ fontSize: "25px" }}
        />
        <textarea
          placeholder="Write a review..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        ></textarea>
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </div>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </div>
  );
};

export default ReviewComponent;
