import React, { useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import ScrollFrame from '../Template/ScrollFrame';
import CardFrame from '../Template/CardFrame';

interface MovieListProps {
  title: string;
  fontSize?: string;
  frameClassName?: string;
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({frameClassName, title, movies, fontSize}) => {

  return (
    <CardFrame className={frameClassName} title={title} fontSize={fontSize}>
      <ScrollFrame>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ScrollFrame>
    </CardFrame>
  );
};

export default MovieList;