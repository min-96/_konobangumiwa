import React, { useState } from 'react';
import MovieCard from '../Molecule/Home/MovieCard';
import './MovieList.css';
import { Movie } from '../../types/movie';

interface MovieListProps {
  listName: string;
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({listName, movies}) => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastPage = currentIndex >= movies.length - 4;
  const isFirstPage = currentIndex === 0;

  const handleNextSlide = () => {
    //setCurrentIndex((prevIndex) => (prevIndex + 4) % movies.length);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 4;
      return nextIndex + 4 > movies.length ? movies.length - 4 : nextIndex;
    });
  };

  const handlePreviousSlide = () => {
    //setCurrentIndex((prevIndex) => (prevIndex - 4 + movies.length) % movies.length);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 4;
      return nextIndex < 0 ? 0 : nextIndex;
    });
  };

  return (
    <div className="movie-list">
      {!isFirstPage && (
        <button className="slide-button left prev-button" onClick={handlePreviousSlide}>
          Prev
        </button>
      )}
      <div className="list-name">{listName}</div>
      <div className="card-list">
        {movies.slice(currentIndex, currentIndex + 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      {!isLastPage && (
        <button className="slide-button right next-button" onClick={handleNextSlide}>
          Next
        </button>
      )}
    </div>
  );
};

export default MovieList;