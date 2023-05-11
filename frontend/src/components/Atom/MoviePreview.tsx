import React from 'react';

interface MoviePreviewProps {
  title: string;
  rating: number;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ title, rating }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>평점: {rating}</p>
    </div>
  );
};

export default MoviePreview;
