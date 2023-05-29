import React, { useEffect, useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import HorizontalScrollFrame from '../Template/HorizontalScrollFrame';
import * as API from '../../API/Animation';
import { useError } from '../../hook/ErrorContext';
import { useUser } from '../../hook/UserContext';

interface MovieListProps {
  cardWidth?: string;
  queryName: string;
  queryParams?: string;
  keyName: string;
};

const MovieList: React.FC<MovieListProps> = ({cardWidth, queryName, keyName, queryParams}) => {
  const [ movies, setMovies ] = useState<Movie[] | null>(null);
  const { myReviews } = useUser();

  const { showError } = useError();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await API.getMovies({queryName, queryParams});
        setMovies(data);
      } catch (error: any) {
        showError('Movie Fetch Error', error.message); // 에러 처리
      }
    }
    fetchMovies();
  }, [queryParams]);

  if (!movies) return null;

  return (
    <HorizontalScrollFrame key={queryParams}>
      {movies.map((movie, index) => (
        <div key={`${keyName}_${movie.id}`} className="relative">
          <span className="w-7 h-7 absolute top-5 left-5 bg-black bg-opacity-50 text-white rounded flex items-center justify-center font-bold">{index + 1}</span>
          <MovieCard movie={movie} review={myReviews.find((elem)=>(elem.animationId === movie.id))} width={cardWidth ? cardWidth : '200px'} />
        </div>
      ))}
    </HorizontalScrollFrame>
  );
};

export default MovieList;
