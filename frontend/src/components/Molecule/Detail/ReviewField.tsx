import React, { useEffect, useState } from 'react';
import StarRating from '../../Atom/StarRating';
import MyWish from '../../Atom/MyWish';
import MyComment from '../../Atom/MyComment';
import { useParams } from 'react-router-dom';
import { useError } from '../../../hook/ErrorContext';
import { Review } from '../../../types/movie';
import * as API from '../../../API/Review';
import { createContext } from "react";
import { useUser } from '../../../hook/UserContext';

interface ReviewContextType {
  review: Review | null;
  setReview: (review: Review | null) => void;
  wish: boolean;
  setWish: (wish: boolean) => void;
  animationId: number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReview = () => {
  const context = React.useContext(ReviewContext);
  if (!context) {
    throw new Error("ReviewContext is not defined");
  }
  return context;
};

interface ReviewFieldProps {
}

const ReviewField: React.FC<ReviewFieldProps> = ({ }) => {
  const { contentId } = useParams<{ contentId: string }>();
  const animationId = Number.parseInt(contentId || '0');
  const { myReviews } = useUser();
  const [ review, setReview ] = useState<Review | null>(null);
  const [ wish, setWish ] = useState<boolean>(false);

  useEffect(() => {
    async function getMyReview() {
      if (contentId) {
        setReview(myReviews.find((elem)=>(elem.animationId === animationId)) || null);
      }
    }
    getMyReview();
  }, [contentId, myReviews]);

  if (!contentId)
    return null;

  return (
    <ReviewContext.Provider value={{ review, setReview, wish, setWish, animationId }}>
      <div className="h-[80px] flex">
        <div className="border-r-2 flex flex-col items-center justify-center pr-6">
          <p>평가하기</p>
          <StarRating />
        </div>
        <div className="flex items-center justify-center pl-6 pr-6">
          <div className="flex w-full">
            <div className="flex items-center mr-6">
              <MyWish />
            </div> 
            <div className="flex items-center">
              <MyComment />
            </div>
          </div>
        </div>
      </div>
    </ReviewContext.Provider>
  );
};

export default ReviewField;
