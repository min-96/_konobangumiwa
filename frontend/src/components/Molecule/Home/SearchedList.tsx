import React, { useRef, useState } from 'react';
import { Movie } from '../../../types/movie';
import { useOutsideAlerter } from '../../../hook/useOutsideAlerter';
import SearchedItem from '../../Atom/SearchedItem';

interface SearchedListProps {
  searchResults: Movie[];
  handleClose: ()=>void;
}

const SearchedList: React.FC<SearchedListProps> = ({searchResults, handleClose}) => {
  const searchListRef = useRef<HTMLDivElement | null>(null)

  useOutsideAlerter(searchListRef, handleClose);
  return (
    <div ref={searchListRef} className="absolute top-10 bg-primary w-full border border-gray-700 rounded-sm border-white">
      {
        searchResults.length > 0 ? searchResults.map((movie) => (
          <SearchedItem movie={movie}/>
        ))
        : <p className="p-2 px-4 text-sm">검색 결과가 없습니다.</p>
      }
    </div>
  );
};

export default SearchedList;