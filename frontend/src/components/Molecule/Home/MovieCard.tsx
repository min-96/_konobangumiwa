import React from 'react';
import './MovieCard.css';
import { Movie, Review } from '../../../types/movie';
import { Link } from 'react-router-dom';
import MovieThumbnail from '../../Atom/MovieThumbnail';
import { FaStar } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie,
  review?: Review;
  otherReview?: Review;
  width?: string,
  ratio?: string,
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, review, otherReview, width, ratio }) => {
  return (
    <div className="movie-card" title={movie.title} style={{ minWidth: '100px', width: width }}>
      <Link to={`/contents/${movie.id}`}>
        <MovieThumbnail src={movie.thumbnail} alt={movie.title} ratio={ratio? ratio : '150%'}/> 
        <div className="movie-preview">
          <h4>{movie.title}</h4>
          {
            otherReview || review ?
            <div className="flex items-center">
              {
                otherReview && otherReview.userId !== review?.userId &&
                <>
                  <FaStar className="text-blue-500 w-4 h-4 mr-1" />
                  <p>{otherReview.evaluation}</p>
                  { review && <div className="mx-2"></div>}
                </>
              }
              {
                review &&
                <>
                  <FaStar className="text-red-500 w-4 h-4 mr-1" />
                  <p className="font-semibold">{review.evaluation}</p>
                  <p className="text-sm ml-2 font-semibold">평가함</p>
                </>
              }
            </div>
            :
            movie.reviewCount ?
            <p className="flex items-center">
              <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
              {(movie.grade / movie.reviewCount).toFixed(2)} ({movie.reviewCount > 999 ? '999+' : movie.reviewCount})
            </p>
            : <p>평가없음</p>
          }
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
