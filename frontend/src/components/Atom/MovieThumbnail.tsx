import React from 'react';

interface MovieThumbnailProps {
  src: string;
  alt: string;
  ratio: string;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ src, alt, ratio}) => {
  return (
    <div className="thumbnail-container" style={{paddingTop: ratio}}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default MovieThumbnail;
