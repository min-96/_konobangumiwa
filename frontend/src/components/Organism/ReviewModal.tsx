import React, { useEffect, useRef, useState } from 'react';
import { Review } from '../../types/movie';
import ModalFrame from '../Template/ModalFrame';
import { oneMovie } from '../../dummy/dummy_data';
import ReviewRating from '../Atom/ReviewRating';
import UserProfileLink from '../Atom/UserProfileLink';
import EditableTextarea from '../Atom/EditableTextarea';

interface ReviewModalProps {
  review: Review | null;
  handleClose: ()=>void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({review, handleClose}) => {
  if (!review) return null;

  return (
    <ModalFrame handleModalClose={handleClose}>
      <div className="w-[500px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <UserProfileLink userId={review.id} nickname={review.nickname} profileUrl={review.profileUrl} handleClick={handleClose}/>
              <div className="ml-2">
                <ReviewRating rating={review.rating} />
              </div>
            </div>
            <p>{"영화제목"}</p>
            <p>{"상영날짜"}</p>
            <p>{"무비정보"}</p>
          </div>
          <img className="w-16" src={oneMovie.thumbnail} alt={oneMovie.title} />
        </div>
        <hr className="mt-2 mb-2"/>
        <EditableTextarea
          inputHeight="40"
          initContent={review.content}
          saveProcess={(content: string)=>{handleClose()}}
          deleteProcess={()=>{handleClose()}}
          align="left"
          maxChars={1000}
        />
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;