import React, { useEffect, useState } from 'react';
import { MovieDetail } from '../../types/movie';
import ReviewField from '../Molecule/Detail/ReviewField';
import CardFrame from '../Template/CardFrame';
import MovieThumbnail from '../Atom/MovieThumbnail';
import { FaStar } from 'react-icons/fa'
import { useUser } from '../../hook/UserContext';

interface DetailHeaderProps {
  movie: MovieDetail;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({movie}) => {
  const crops = movie.crops_ratio.split(',');
  const { user } = useUser();

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
          <div className="ml-10 text-left">
            <h2 className="mt-16 pt-2 text-2xl font-bold mb-2">
              {movie.title}
            </h2>
            <div className="flex">
              <div className="w-[200px]">
                <p className="mb-1"><strong className="mr-2">출시</strong>{movie.release.split('|')[0]}</p>
                <p className="flex items-center">
                {
                  movie.reviewCount ?
                  <>
                    <strong className="mr-2">평균</strong>
                    <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
                    {movie.grade / movie.reviewCount} ({movie.reviewCount > 999 ? '999+' : movie.reviewCount})
                  </>
                  : <p>평가없음</p>
                }
                </p>
              </div>
              <div>
                <p className="mb-1"><strong className="mr-2">장르</strong>
                  {movie.genreList.map((ele: any)=>ele.genretypeId).join(", ")}
                </p>
              </div>
            </div>
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