import React from 'react';
import { Review } from '../../../types/movie';
import UserProfileLink from '../../Atom/UserProfileLink';
import ReviewRating from '../../Atom/ReviewRating';

interface ReviewCardProps {
  review: Review;
  handleClick: ()=>void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({review, handleClick}) => {
  return (
    <div className="flex-shrink-0 rounded-sm w-60 border-green-400 border-2 m-2 p-2"
      onClick={handleClick}>
      <div className="flex justify-between items-center mb-2">
        <UserProfileLink userId={review.id} profileURL={review.profileURL} nickname={review.nickname} />
        <ReviewRating rating={review.rating} />
      </div>
      <hr />
      <p className="mt-2 mb-2 h-36 overflow-hidden line-clamp-6" title={review.content}>
        {review.content}
      </p>
    </div>
  );
};

export default ReviewCard;
