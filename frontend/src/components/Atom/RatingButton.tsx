import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa'; 
import { BsHeart, BsHeartFill } from 'react-icons/bs'; 
import ReviewModal from '../Organism/ReviewModal';
import { Review } from '../../types/movie';
import { oneReview } from '../../dummy/dummy_data';


interface RatingButtonProps {
}

const RatingButton: React.FC<RatingButtonProps> = () => {
  const [wish, setWish] = useState(false);
  const [comment, setComment] = useState(false);
  const [animation, setAnimation] = useState(false); 
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedReview(null);
  }

  function handleWishClick() {
    setWish((prev)=>(!prev));
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500); // 애니메이션 지속시간 조정
  };

  function handleCommentClick() {
    const dummy_review : Review = oneReview;
    setSelectedReview(dummy_review);
    setModalOpen(true);
    setComment((prev)=>(!prev));
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center mr-6">
        <button onClick={handleWishClick} className="flex items-center text-black mr-2 transition-all duration-300 hover:scale-110">
          {
            wish ? <BsHeartFill className={`h-4 w-4 mr-2 ${animation ? 'animate-ping' : ''}`}/>
            : <BsHeart className={`h-4 w-4 mr-2`}/>
          }
          <div>
            보고싶어요
          </div>
        </button>
      </div>
      <div className="flex items-center">
        <button onClick={handleCommentClick} className="flex items-center text-black transition-all duration-300 hover:scale-110">
          <FaPen className="h-4 w-4 mr-2"/>
          {
            comment ? 
            <div>
              내 코멘트 보기
            </div>
            : 
            <div>
              코멘트 달기
            </div>
          }
        </button>
      </div>
      {isModalOpen && (
        <ReviewModal 
          review={selectedReview}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default RatingButton;