import React, { useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import { Movie } from '../../types/movie';
import ScrollFrame from '../Template/ScrollFrame';
import CardFrame from '../Template/CardFrame';

interface MovieListProps {
  listName: string;
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({listName, movies}) => {

  return (
    <div className="relative">
      <CardFrame title={listName} fontSize="2xl">
        <ScrollFrame>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollFrame>
      </CardFrame>
    </div>
  );
};

export default MovieList;