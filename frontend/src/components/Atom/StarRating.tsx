import React, { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <div
            key={index}
          >
            <FaStar
              className={`h-8 w-8 p-0.5 cursor-pointer ${
                (hoverRating || rating) >= index ? "text-yellow-400" : "text-gray-400"
              }`}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={() => onMouseLeave()}
              onClick={() => onSaveRating(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
