import React from 'react';
import { reviews } from '../../dummy/dummy_data';
import CardFrame from '../Template/CardFrame';
import ScrollFrame from '../Template/ScrollFrame';
import ReviewCard from '../Molecule/Detail/ReviewCard';

interface ReviewListProps {
  frameClassName: string;
  title: string;
}

const ReviewList: React.FC<ReviewListProps> = ({frameClassName, title}) => {
  return (
    <CardFrame className={frameClassName} title={title}>
      <ScrollFrame>
        {
          reviews.map((item) => (
            <ReviewCard key={item.id} review={item} />
          ))
        }

      </ScrollFrame>
    </CardFrame>
  );
};

export default ReviewList;