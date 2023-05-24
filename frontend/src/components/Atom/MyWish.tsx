import React, { useContext, useEffect, useState } from 'react';
import { BsHeart, BsHeartFill, BsHeartPulseFill } from 'react-icons/bs'; 
import * as API from '../../API/Wish';
import { useError } from '../../hook/ErrorContext';
import { useReview } from '../Molecule/Detail/ReviewField';

interface MyWishProps {
}

const MyWish: React.FC<MyWishProps> = () => {
  const { review, animationId, wish, setWish } = useReview();
  const [animation, setAnimation] = useState(false); 
  const { showError } = useError();
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function getMyWish() {
      try {
        const wishYN = await API.getAnimationMyWish({animationId});
        setWish(wishYN);
      }
      catch (e: any) {
        showError("fetch Wish Error", e.message);
      }
    }
    getMyWish();
  }, [])

  function handleWishClick() {
    try {
      if (timeoutID) clearTimeout(timeoutID);
      if (!wish) {
        API.createAnimationMyWish({animationId});
        setAnimation(true);
        const id = setTimeout(() => setAnimation(false), 500);
        setTimeoutID(id);
        setWish(true);
      }
      else {
        API.deleteAnimationMyWish({animationId});
        setAnimation(false);
        setTimeoutID(null);
        setWish(false);
      }
    }
    catch (e: any) {
      showError("create Wish Error", e.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleWishClick}
        className={`flex items-center text-black mr-2 transition-all duration-300 hover:scale-110
          ${!review ? "text-black" : "text-gray-500"}`}
        disabled={!!review}
        title={review ? "이미 본 애니메이션입니다." : ""}
      >
        {
          review ? <BsHeartPulseFill className={`h-4 w-4 mr-2`} />
          :
          wish ? <BsHeartFill className={`h-4 w-4 mr-2 ${animation ? 'animate-ping' : ''}`}/>
          : <BsHeart className={`h-4 w-4 mr-2`}/>
        }
        <div>
          { review ? '이미봤어요' : '보고싶어요' }
        </div>
      </button>
    </div>
  );
};

export default MyWish;