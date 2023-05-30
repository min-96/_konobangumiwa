import React from 'react';
import CardFrame from '../Template/CardFrame';
import { MovieDetail } from '../../types/movie';
import { useMovie } from '../Template/Detail';

interface DetailInfoProps {
  frameClassName: string;
  title: string;
}

const DetailInfo: React.FC<DetailInfoProps> = ({frameClassName, title}) => {
  const { movie } = useMovie();

  if (!movie) return null;

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
