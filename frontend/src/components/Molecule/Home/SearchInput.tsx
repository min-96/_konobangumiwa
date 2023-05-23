import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchedList from './SearchedList';
import { Movie } from '../../../types/movie';
import * as API from '../../../API/Animation';
import { useError } from '../../../hook/ErrorContext';

interface SearchInputProps {
  isTransparent: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({isTransparent}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showError } = useError();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setIsOpen(text.length > 0);
    async function searchAnimations() {
      try {
        const res = await API.searchTitle({title: text});
        setSearchResults(res);
      } catch (error : any) {
        showError('Search Error', error.message);
      }
    }
    searchAnimations();
  };

  return (
    <div className="flex-col relative w-72">
      <input
        type="text"
        placeholder="컨텐츠를 검색해보세요"
        value={searchText}
        onChange={handleChange}
        onKeyDown={(event)=>{ if (event.key === 'enter') console.log();}}
        className={`pl-8 pr-2 py-1 border border-gray-700 rounded text-white w-full focus:outline-none
                    ${isTransparent ? 'bg-transparent text-border' : 'bg-primary'}`}
        onFocus={()=>{setIsOpen(searchText.length > 0)}}
      />
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <FiSearch className={`text-white ${isTransparent && 'text-border'}`} />
      </div>
      { isOpen &&
        <SearchedList searchResults={searchResults} handleClose={()=>{setIsOpen(false)}}/>
      }
    </div>
  );
};

export default SearchInput;
