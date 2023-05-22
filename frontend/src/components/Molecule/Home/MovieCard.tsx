import React from 'react';
import './MovieCard.css';
import { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';
import MovieThumbnail from '../../Atom/MovieThumbnail';
import { FaStar } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie,
  width?: string,
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, width }) => {
  return (
    <div className="movie-card" style={{ width: width ? width : '200px' }}>
      <Link to={`/contents/${movie.id}`}>
        <MovieThumbnail src={movie.thumbnail} alt={movie.title} />
        <div className="movie-preview">
          <h4>{movie.title}</h4>
          {
            movie.reviewCount ?
            <p className="flex items-center">
              <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
              {movie.grade / movie.reviewCount} ({movie.reviewCount > 999 ? '999+' : movie.reviewCount})
            </p>
            : <p>평가없음</p>
          }
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
