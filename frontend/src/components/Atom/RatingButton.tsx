import React from 'react';
import { FaPen, FaEye } from 'react-icons/fa'; 

interface RatingButtonProps {
}

const RatingButton: React.FC<RatingButtonProps> = () => {
  return (
    <div className="flex w-full">
      <div className="flex items-center mr-6">
        <button className="flex items-center text-black mr-2 hover:scale-110">
          <FaEye className="h-6 w-6 mr-2"/>
          <div>
            보고싶어요
          </div>
        </button>
      </div>
      <div className="flex items-center mr-6">
        <button className="flex items-center text-black mr-2 hover:scale-110">
          <FaPen className="h-5 w-5 mb-1 mr-2"/>
          <div>
            코멘트달기
          </div>
        </button>
      </div>
    </div>
  );
};

export default RatingButton;
