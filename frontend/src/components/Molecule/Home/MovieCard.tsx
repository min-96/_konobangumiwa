import React from 'react';
import MovieThumbnail from '../../Atom/MovieThumbnail';
import MoviePreview from '../../Atom/MoviePreview';
import './MovieCard.css';
import { Movie } from '../../../types/movie';

interface MovieCardProps {
  movie: Movie,
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <MovieThumbnail imageUrl={movie.imageUrl} altText={movie.title} />
      <MoviePreview title={movie.title} rating={movie.rating} />
    </div>
  );
};

export default MovieCard;
