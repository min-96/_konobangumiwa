import React from 'react';
import { FaStar } from 'react-icons/fa';
import { MovieDetail } from '../../types/movie';

interface MovieProfileProps {
  movie: MovieDetail;
  width?: string
}

const MovieProfile: React.FC<MovieProfileProps> = ({ movie, width }) => {
  
  return (
    <div style={{ width }}>
      <h2 className={`pt-2 text-2xl font-bold mb-2 line-clamp-1`}> 
        {movie.title}
      </h2>
      <div className="flex">
        <div className={`w-[200px] `}>
          <p className={`mb-1 `}>
            <strong className="mr-2">출시</strong>{movie.release.split('|')[0]}
          </p>
          <p className="flex items-center">
            {movie.reviewCount ? (
              <>
                <strong className={`mr-2 `}>평균</strong>
                <FaStar className={`text-yellow-500 w-4 h-4 mr-1 `} /> 
                {(movie.grade / movie.reviewCount).toFixed(2)} ({movie.reviewCount > 999 ? '999+' : movie.reviewCount})
              </>
            ) : (
              <p className={''}>평가없음</p>
            )}
          </p>
        </div>
        <div>
          <p className={`mb-1`}> 
            <strong className="mr-2">장르</strong>
            {movie.genreList.map((ele: any) => ele.genretypeId).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieProfile;
