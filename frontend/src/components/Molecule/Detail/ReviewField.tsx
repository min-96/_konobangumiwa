import React from 'react';
import RatingButton from '../../Atom/RatingButton';
import StarRating from '../../Atom/StarRating';

interface ReviewFieldProps {
}

const ReviewField: React.FC<ReviewFieldProps> = ({ }) => {
  return (
    <div className="h-[80px] flex">
      <div className="w-[250px] border-r-2 flex flex-col items-center justify-center pr-6">
        <p>평가하기</p>
        <StarRating />
      </div>
      <div className="flex items-center justify-center pl-6 pr-6 w-full">
        <RatingButton />
      </div>
    </div>
  );
};

export default ReviewField;
