import React from 'react';
import LikeTags from '../Molecule/User/LikeTags';
import { TypeCount } from '../../types/movie';
import MovieList from './MovieList';

interface PreperenceTabProps {
  genres: TypeCount[];
  tags: TypeCount[];
}

const PreperenceTab: React.FC<PreperenceTabProps> = ({genres, tags}) => {

  return (
    <div className="m-6 space-y-6">
          {/* <LikeTags title="선호장르" list={genres}/>
          <MovieList title="장르에 맞는 애니메이션 추천" queryName="userBasedGenre"/> */}

          {/* <hr/> */}
      <h2 className="text-xl font-semibold">선호태그</h2>
      <LikeTags list={tags}/>
      <hr/>
      <h2 className="text-xl font-semibold">추천 애니메이션</h2>
      <MovieList keyName="prep" queryName="userBasedTag"/>
    </div>
      
      
  );
};

export default PreperenceTab;
