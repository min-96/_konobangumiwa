import React, { useEffect, useState } from 'react';
import { MovieDetail } from '../../types/movie';
import ReviewField from '../Molecule/Detail/ReviewField';
import CardFrame from '../Template/CardFrame';
import MovieThumbnail from '../Atom/MovieThumbnail';
import { FaStar } from 'react-icons/fa'
import { useUser } from '../../hook/UserContext';
import { useMovie } from '../Template/Detail';
import MovieProfile from '../Atom/MovieProfile';

interface DetailHeaderProps {
}

const DetailHeader: React.FC<DetailHeaderProps> = () => {
  const { user } = useUser();
  const { movie } = useMovie();

  if (!movie) return null;

  const crops = movie.crops_ratio.split(',');

  return (
    <>
      <div
        className="w-full h-80 bg-cover relative"
        style={{
          backgroundImage: `url(${movie.backgroundImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: `-${crops[1]}px`
        }}
      >
        <CardFrame className="flex absolute bottom-0 translate-y-3/4 left-1/2 -translate-x-1/2">
          <div style={{width: '160px'}}>
            <MovieThumbnail src={movie.thumbnail} alt={movie.title} />
          </div>
          <div className="ml-10 text-left mt-16">
            <MovieProfile movie={movie}/>
            {
              user ? <ReviewField/>
              : <p className="h-[80px] text-center p-4 text-lg text-blue-700">평가는 로그인이 필요합니다.</p>
            }
          </div>
        </CardFrame>
      </div>

      <div className="w-full h-48 flex items-center justify-center bg-gray-100">
        {/* 이 부분은 필요에 따라 추가 정보를 넣을 수 있습니다. */}
      </div>
    </>
  );
};

export default DetailHeader;