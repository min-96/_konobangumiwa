import React, { useState } from 'react';
import { TbPencilPlus, TbPencilOff } from 'react-icons/tb'; 
import ReviewModal from '../Organism/ReviewModal';
import { useReview } from '../Molecule/Detail/ReviewField';
import { useUser } from '../../hook/UserContext';
import { useMovie } from '../Template/Detail';

interface MyCommentProps {
}

const MyComment: React.FC<MyCommentProps> = () => {
  const { review, setReview } = useReview();
  const { user } = useUser();
  const { movie } = useMovie();
  const [isModalOpen, setModalOpen] = useState(false);

  if (!user || !movie)
    return null;

  const handleModalClose = () => {
    setModalOpen(false);
  }

  function handleCommentClick() {
    setModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleCommentClick}
        className={`flex items-center text-black transition-all duration-300 hover:scale-110
          ${review ? "text-black" : "text-gray-500"}`}
        disabled={!review}
        title={review ? "": "평가 후 작성할 수 있습니다"}
      >
        {
          review ? <TbPencilPlus className="h-5 w-5 mr-2"/>
          : <TbPencilOff className="h-5 w-5 mr-2"/>
        }
        {
          review?.comment ? 
          <div>
            내 코멘트 보기
          </div>
          : 
          <div>
            코멘트 달기
          </div>
        }
      </button>
      {isModalOpen && review && (
        <ReviewModal 
          review={review}
          setReview={setReview}
          targetUser={user}
          movie={movie}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default MyComment;