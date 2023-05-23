import React, { useEffect, useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import ScrollFrame from '../Template/ScrollFrame';
import CardFrame from '../Template/CardFrame';
import * as API from '../../API/Animation';
import { useError } from '../../hook/ErrorContext';

interface MovieListProps {
  title: string;
  fontSize?: string;
  frameClassName?: string;
  cardWidth?: string;
  queryName: string;
};

const MovieList: React.FC<MovieListProps> = ({frameClassName, title, fontSize, cardWidth, queryName}) => {
  const [ movies, setMovies ] = useState<Movie[] | null>(null);

  const { showError } = useError();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await API.getMovies({queryName});
        setMovies(data);
      } catch (error: any) {
        showError('Movie Fetch Error', error.message); // 에러 처리
      }
    }
    fetchMovies();
  }, []);

  return (
    <CardFrame className={frameClassName} title={title} fontSize={fontSize}>
      {
        movies && 
        <ScrollFrame>
          {movies.map((movie, index) => (
            <div key={movie.id} className="relative">
              <span className="w-7 h-7 absolute top-5 left-5 bg-black bg-opacity-50 text-white rounded flex items-center justify-center font-bold">{index + 1}</span>
              <MovieCard movie={movie} width={cardWidth} />
            </div>
          ))}
        </ScrollFrame>
      }
    </CardFrame>
  );
};

export default MovieList;
