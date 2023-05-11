import React from 'react';
import MovieThumbnail from '../../Atom/MovieThumbnail';
import MoviePreview from '../../Atom/MoviePreview';

interface MovieCardProps {
  movie: {
    imageUrl: string;
    altText: string;
    title: string;
    rating: number;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <MovieThumbnail imageUrl={movie.imageUrl} altText={movie.altText} />
      <MoviePreview title={movie.title} rating={movie.rating} />
    </div>
  );
};

export default MovieCard;
