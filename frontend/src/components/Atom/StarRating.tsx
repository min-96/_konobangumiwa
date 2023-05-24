import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Review } from "../../types/movie";
import { useReview } from "../Molecule/Detail/ReviewField";
import { useUser } from "../../hook/UserContext";
import * as API from "../../API/Review";
import { useError } from "../../hook/ErrorContext";

interface StarRatingProps {
}

const StarRating: React.FC<StarRatingProps> = () => {
  const { review, setReview, setWish, animationId } = useReview();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { showError } = useError();

  useEffect(() => {
    setRating(review?.evaluation || 0);
  }, [review]);

  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = async (index: number) => {
    try {
      if (rating === index) {
        // delete rating
        if (review) {
          if (review.comment) {
            // 코멘트 있으니까 삭제할건지 물어보기
          }
          const ret = await API.deleteAnimationReview({id: review.id});
          setReview(null);
          setWish(false);
          setRating(0);
        }
      } else {
        // set rating
        // const ret = await API.createAnimationReview({})
        // setReview(ret);
        if (rating === 0) {
          const ret = await API.createAnimationReview({animationId, evaluation: index});
          setReview(ret);
        }
        else {
          if (review) {
            const ret = await API.updateAnimationReview({id: review.id ,animationId, evaluation: index});
            setReview(ret);
          }
        }
        setWish(false);
        setRating(index);
      }
    }
    catch (e: any) {
      showError("Save Rating Error", e.message);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <div key={index}>
            <FaStar
              className={`h-8 w-8 p-0.5 cursor-pointer ${
                hoverRating === rating && index <= hoverRating
                  ? "text-red-400"
                  : hoverRating >= index
                  ? "text-blue-400"
                  : rating >= index
                  ? "text-yellow-400"
                  : "text-gray-400"
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
