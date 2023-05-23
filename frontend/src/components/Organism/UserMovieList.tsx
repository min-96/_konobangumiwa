import React, { useState } from 'react';
import CardFrame from '../Template/CardFrame';
import { movies } from '../../dummy/dummy_data';
import MovieCard from '../Molecule/Home/MovieCard';

interface UserMovieListProps {
  frameClassName: string;
  userId: number;
}

const UserMovieList: React.FC<UserMovieListProps> = ({frameClassName, userId}) => {
  const [selectedMenu, setSelectedMenu] = useState('평가함');

  // 가상의 데이터 예시
  const ratedMovies = [...movies, ...movies];

  const wishlistMovies = movies;

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <CardFrame className={frameClassName} title=" ">
      <div>
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
        </div>
        <hr/>
        <div className="flex flex-wrap">
          {selectedMenu === '평가함' &&
            ratedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={{...movie, grade: 10, reviewCount: 20, release: 'test', id:Number.parseInt(movie.id) }} width="100px"/>
            ))}

          {selectedMenu === '보고싶어요' &&
            wishlistMovies.map((movie) => (
              <MovieCard key={movie.id} movie={{...movie, grade: 10, reviewCount: 20, release: 'test', id:Number.parseInt(movie.id) }} />
            ))}
        </div>
      </div>
    </CardFrame>
  );
};

export default UserMovieList;
