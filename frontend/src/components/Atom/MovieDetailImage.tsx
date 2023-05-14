import React from 'react';

interface MovieDetailImageProps {
  imageUrl: string;
  altText: string;
}

const MovieDetailImage: React.FC<MovieDetailImageProps> = ({ imageUrl, altText }) => {
  return (
    <div className="h-80 overflow-hidden">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default MovieDetailImage;