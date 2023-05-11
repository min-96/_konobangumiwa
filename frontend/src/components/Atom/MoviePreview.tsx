import React from 'react';

interface MoviePreviewProps {
  title: string;
  rating: number;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ title, rating }) => {
  return (
    <div className="movie-preview">
      <h4>{title}</h4>
      <p>평점: {rating}</p>
    </div>
  );
};

export default MoviePreview;
