import React from 'react';
import { Review } from '../../../types/movie';
import { FaStar, FaUser } from 'react-icons/fa';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({review}) => {
  return (
    <div className="flex-shrink-0 rounded-sm w-60 border-green-400 border-2 m-2 p-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {review.profileURL 
            ? <img className="rounded-full h-8 w-8 mr-2" src={review.profileURL} alt="Profile" />
            : <FaUser className="h-8 w-8 rounded-full bg-blue-200 text-gray-600 mr-2 p-1" />}
          <p>{review.nickname}</p>
        </div>
        <div className="flex items-center border-2 rounded-full px-2">
          <FaStar className="text-yellow-500 mr-1" />
          <p>{review.rating}</p>
        </div>
      </div>
      <hr />
      <p className="mt-2">
        {review.content}
      </p>
    </div>
  );
};

export default ReviewCard;
