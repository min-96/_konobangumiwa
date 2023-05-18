import React, { useState } from 'react';
import { reviews } from '../../dummy/dummy_data';
import CardFrame from '../Template/CardFrame';
import ScrollFrame from '../Template/ScrollFrame';
import ReviewCard from '../Molecule/Detail/ReviewCard';
import ReviewModal from './ReviewModal';
import { Review } from '../../types/movie';

interface ReviewListProps {
  frameClassName: string;
  title: string;
}

const ReviewList: React.FC<ReviewListProps> = ({frameClassName, title}) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = (review : Review) => {
    setSelectedReview(review);
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedReview(null);
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
                handleClick={() => handleCardClick(item)}
              />
            ))
          }
        </ScrollFrame>
      </CardFrame>
      {isModalOpen && (
        <ReviewModal 
          review={selectedReview}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ReviewList;
