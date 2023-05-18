import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ReviewRatingProps {
  rating: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center border-2 rounded-full px-2">
      <FaStar className="text-yellow-500 mr-1" />
      <p>{rating}</p>
    </div>
  );
};

export default ReviewRating;
