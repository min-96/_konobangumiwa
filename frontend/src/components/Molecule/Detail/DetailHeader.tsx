import React, { useEffect, useState } from 'react';
import { MovieDetail } from '../../../types/movie';
import ReviewField from './ReviewField';
import CardFrame from '../../Template/CardFrame';

interface DetailHeaderProps {
  movie: MovieDetail;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({movie}) => {
  return (
    <>
      <div
        className="w-full h-80 bg-cover relative"
        style={{
          backgroundImage: `url(${movie.detailImage})`,
          backgroundPositionX: `${0}px`,
          backgroundPositionY: `${-326}px`
        }}
      >
        <CardFrame className="flex absolute bottom-0 transform translate-y-3/4 left-1/2 -translate-x-1/2">
          <img src={movie.thumbnail} alt={movie.title} className="w-40 rounded-md border border-gray-300"/>
          <div className="ml-10 text-left w-full">
            <h2 className="mt-16 text-2xl font-bold mb-2">
              {movie.title}
            </h2>
            <p className="mb-2">releaseDate</p>
            <p className="mb-2">평균점수</p>
            <ReviewField />
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