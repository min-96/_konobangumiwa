import React from 'react';

interface MovieThumbnailProps {
  imageUrl: string;
  altText: string;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ imageUrl, altText }) => {
  return <img src={imageUrl} alt={altText} />;
};

export default MovieThumbnail;