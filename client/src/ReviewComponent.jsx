import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewComponent = () => {
  const [rating, setRating] = useState(3);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    
      <ReactStars
        count={3}
        onChange={ratingChanged}
        size={25}
        activeColor="#ffd700"
        value={rating}
      />

  );
};

export default ReviewComponent;
