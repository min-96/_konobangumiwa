import React from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import ScrollFrame from '../Template/ScrollFrame';
import CardFrame from '../Template/CardFrame';

interface MovieListProps {
  title: string;
  fontSize?: string;
  frameClassName?: string;
  movies: Movie[];
  cardWidth?: string;
};

const MovieList: React.FC<MovieListProps> = ({frameClassName, title, movies, fontSize, cardWidth}) => {

  return (
    <CardFrame className={frameClassName} title={title} fontSize={fontSize}>
      <ScrollFrame>
        {movies.map((movie, index) => (
          <div key={movie.id} className="relative">
            <span className="w-7 h-7 absolute top-5 left-5 bg-black bg-opacity-50 text-white rounded flex items-center justify-center font-bold">{index + 1}</span>
            <MovieCard movie={movie} width={cardWidth} />
          </div>
        ))}
      </ScrollFrame>
    </CardFrame>
  );
};

export default MovieList;
