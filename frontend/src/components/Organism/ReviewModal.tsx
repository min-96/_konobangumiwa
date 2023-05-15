import React from 'react';
import { Review } from '../../types/movie';
import ModalFrame from '../Template/ModalFrame';
import { FaHeart, FaStar } from 'react-icons/fa';
import { oneMovie } from '../../dummy/dummy_data';
import ReviewRating from '../Atom/ReviewRating';
import UserProfileLink from '../Atom/UserProfileLink';

interface ReviewModalProps {
  review: Review | null;
  handleClose: ()=>void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({review, handleClose}) => {
  if (!review)
    return null;

  const movie = oneMovie;
  return (
    <ModalFrame handleModalClose={handleClose}>
      <div className="w-[500px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <UserProfileLink userId={review.id} nickname={review.nickname} profileURL={review.profileURL} handleClick={handleClose}/>
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
        <div className="overflow-auto h-40">
          <p>{review.content}</p>
        </div>
        <hr className="mt-2 mb-2"/>
        <div className="flex justify-between">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-1" />
            <p>{review.id}</p>
          </div>
          <div>
            <button className="bg-yellow-500 text-white rounded px-2 py-1 mr-2">Modify</button>
            <button className="bg-blue-500 text-white rounded px-2 py-1 mr-2">Save</button>
            <button className="bg-red-500 text-white rounded px-2 py-1">Delete</button>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;