import React from 'react';
import CardFrame from '../Template/CardFrame';
import { MovieDetail } from '../../types/movie';

interface DetailInfoProps {
  frameClassName: string;
  title: string;
  movie: MovieDetail;
}

const DetailInfo: React.FC<DetailInfoProps> = ({frameClassName, title, movie}) => {
  return (
    <CardFrame className={frameClassName} title={title}>
      { movie.author && 
        <p>
          {movie.author}
        </p>
      }
      <p className="mt-3">
        {movie.introduction}
      </p>
    </CardFrame>
  );
};

export default DetailInfo;
