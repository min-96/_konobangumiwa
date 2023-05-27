import React, { useEffect, useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import HorizontalScrollFrame from '../Template/HorizontalScrollFrame';
import * as API from '../../API/Animation';
import { useError } from '../../hook/ErrorContext';

interface MovieListProps {
  cardWidth?: string;
  queryName: string;
  id?: number;
  keyName: string;
};

const MovieList: React.FC<MovieListProps> = ({cardWidth, queryName, id, keyName}) => {
  const [ movies, setMovies ] = useState<Movie[] | null>(null);

  const { showError } = useError();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await API.getMovies({queryName, id});
        setMovies(data);
      } catch (error: any) {
        showError('Movie Fetch Error', error.message); // 에러 처리
      }
    }
    fetchMovies();
  }, []);

  if (!movies) return null;

  return (
    <HorizontalScrollFrame>
      {movies.map((movie, index) => (
        <div key={`${keyName}_${movie.id}`} className="relative">
          <span className="w-7 h-7 absolute top-5 left-5 bg-black bg-opacity-50 text-white rounded flex items-center justify-center font-bold">{index + 1}</span>
          <MovieCard movie={movie} width={cardWidth ? cardWidth : '200px'} />
        </div>
      ))}
    </HorizontalScrollFrame>
  );
};

export default MovieList;
