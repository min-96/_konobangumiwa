import React from 'react';
import MovieThumbnail from '../../Atom/MovieThumbnail';
import MoviePreview from '../../Atom/MoviePreview';
import './MovieCard.css';
import { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie,
  width?: string,
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, width }) => {
  return (
    <Link to={`/contents/${movie.id}`}>
      <div className="movie-card" style={{ width: width ? width : '200px' }}>
        <MovieThumbnail imageUrl={movie.thumbnail} altText={movie.title} />
        <MoviePreview title={movie.title} rating={movie.rating} />
      </div>
    </Link>
  );
};

export default MovieCard;
