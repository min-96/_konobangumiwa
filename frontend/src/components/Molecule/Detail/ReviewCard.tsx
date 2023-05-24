import React from 'react';
import { Review, User } from '../../../types/movie';
import UserProfileLink from '../../Atom/UserProfileLink';
import ReviewRating from '../../Atom/ReviewRating';

interface ReviewCardProps {
  review: Review;
  user: User;
  handleClick: ()=>void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({review, user, handleClick}) => {
  return (
    <div className="flex-shrink-0 w-60 shadow-border m-2 p-2"
      onClick={handleClick}>
      <div className="flex justify-between items-center mb-2">
        <UserProfileLink userId={review.id} profileUrl={user.pictureUrl} nickname={user.displayName} />
        <ReviewRating rating={review.evaluation} />
      </div>
      <hr />
      <p className="mt-2 mb-2 h-36 overflow-hidden line-clamp-6" title={review.comment}>
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
