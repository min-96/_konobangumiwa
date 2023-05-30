import React, { useEffect, useState } from 'react';
import CardFrame from '../Template/CardFrame';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie, ReviewRelation, TypeCount, Wish } from '../../types/movie';
import PreperenceTab from './PreperenceTab';
import { useError } from '../../hook/ErrorContext';
import * as Review_API from '../../API/Review';
import * as Wish_API from '../../API/Wish';
import * as User_API from '../../API/User';
import { useUser } from '../../hook/UserContext';

interface UserMovieListProps {
  frameClassName: string;
  userId: number;
}

const UserMovieList: React.FC<UserMovieListProps> = ({frameClassName, userId}) => {
  const [selectedMenu, setSelectedMenu] = useState('평가함');
  const [ratedMovies, setRatedMovies] = useState<ReviewRelation[]>([]);
  const [wishMovies, setWishMovies] = useState<Wish[]>([]);

  // const [likeGenres, setLikeGenres] = useState<TypeCount[]>([]);
  const [likeTags, setLikeTags] = useState<TypeCount[]>([]);

  const [isLoadRate, setIsLoadRate] = useState(false);
  const [isLoadWish, setIsLoadWish] = useState(false);
  const [isLoadPrep, setIsLoadPrep] = useState(false);

  const { showError } = useError();
  const { user, myReviews } = useUser();

  useEffect(() => {
    async function getReviews() {
      try {
        const ret = await Review_API.getUserReviews({userId: userId})
        setRatedMovies(ret);
      }
      catch (e:any) {
        showError("fetch Review Error",e.message);
      }
    }

    async function getWishList() {
      try {
        const ret = await Wish_API.getUserWishes({userId: userId});
        setWishMovies(ret);
      }
      catch (e:any) {
        showError("fetch Wish Error",e.message);
      }
    }
    // async function getLikeGenres() {
    //   try {
    //     const ret = await User_API.getUserLikeGenres()
    //     setLikeGenres(ret);
    //   }
    //   catch (e:any) {
    //     showError("fetch Like Genres Error",e.message);
    //   }
    // }

    async function getLikeTags() {
      try {
        const ret = await User_API.getUserLikeTags();
        setLikeTags(ret);
      }
      catch (e:any) {
        showError("fetch Like Tags Error",e.message);
      }
    }

    if (selectedMenu === '평가함' && !isLoadRate) {
      getReviews();
      setIsLoadRate(true);
    }
    if (selectedMenu === '보고싶어요' && !isLoadWish) {
      getWishList();
      setIsLoadWish(true);
    }
    if (selectedMenu === '취향분석' && !isLoadPrep) {
      // getLikeGenres();
      getLikeTags();
      setIsLoadPrep(true);
    }
  }, [selectedMenu])

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <CardFrame className={frameClassName} title=" ">
      <div className="flex space-x-10 mb-4 ml-4">
        <button
          className={`${
            selectedMenu === '평가함' ? 'font-bold scale-110' : ''
          }`}
          onClick={() => handleMenuClick('평가함')}
        >
          평가함
        </button>
        <button
          className={`${
            selectedMenu === '보고싶어요' ? 'font-bold scale-110' : ''
          }`}
          onClick={() => handleMenuClick('보고싶어요')}
        >
          보고싶어요
        </button>

        {
          (user?.id === userId) && <button
            className={`${
              selectedMenu === '취향분석' ? 'font-bold scale-110' : ''
            }`}
            onClick={() => handleMenuClick('취향분석')}
          >
            취향분석
          </button>
        }

      </div>
      <hr/>
      <div className="flex flex-wrap">
      {selectedMenu === '평가함' &&
        ratedMovies.map((review) => (
          <div key={`rated_${review.id}`} className="w-[calc(25%-1px)] mb-1">
            <MovieCard movie={review.animation} review={myReviews.find((elem)=>(elem.animationId === review.animationId))} otherReview={review} ratio="75%" />
          </div>
      ))}
      {selectedMenu === '보고싶어요' &&
        wishMovies.map((wish) => (
          <div key={`wish_${wish.id}`} className="w-[calc(25%-1px)] mb-1">
            <MovieCard movie={wish.animation} review={myReviews.find((elem)=>(elem.animationId === wish.animationId))} ratio="75%" />
          </div>
      ))}
      </div>
      {selectedMenu === '취향분석' &&
        <PreperenceTab tags={likeTags} />
      }
    </CardFrame>
  );
};

export default UserMovieList;
