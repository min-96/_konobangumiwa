import React from 'react';

interface MovieThumbnailProps {
  src: string;
  alt: string;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ src, alt }) => {
  return (
    <div className="thumbnail-container">
      <img src={src} alt={alt} />
    </div>
  );
};

export default MovieThumbnail;
