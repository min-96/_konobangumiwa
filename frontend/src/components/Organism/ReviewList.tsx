import React, { useState } from 'react';
import { reviews } from '../../dummy/dummy_data';
import CardFrame from '../Template/CardFrame';
import ScrollFrame from '../Template/ScrollFrame';
import ReviewCard from '../Molecule/Detail/ReviewCard';
import ReviewModal from './ReviewModal';
import { Review, ReviewUser, User } from '../../types/movie';
import { useMovie } from '../Template/Detail';

interface ReviewListProps {
  frameClassName: string;
  title: string;
}

const ReviewList: React.FC<ReviewListProps> = ({frameClassName, title}) => {
  const { movie } = useMovie();

  if (!movie) return null;

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCardClick = (review : Review, user : User) => {
    setSelectedReview(review);
    setSelectedUser(user);
  }

  const handleModalClose = () => {
    setSelectedReview(null);
    setSelectedUser(null);
  }

  return (
    <>
      <CardFrame className={frameClassName} title={title}>
        <ScrollFrame>
          {
            reviews.map((item) => (
              <ReviewCard 
                key={item.id} 
                review={item} 
                user={item.user}
                handleClick={() => handleCardClick(item, item.user)}
              />
            ))
          }
        </ScrollFrame>
      </CardFrame>
      {selectedReview && selectedUser && (
        <ReviewModal 
          review={selectedReview}
          setReview={setSelectedReview}
          targetUser={selectedUser}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ReviewList;
