import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchedList from './SearchedList';
import { Movie } from '../../../types/movie';
import * as API from '../../../API/Animation';
import { useError } from '../../../hook/ErrorContext';
import SearchInput from '../../Atom/SearchInput';

interface SearchContentProps {
  isTransparent: boolean
}

const SearchContent: React.FC<SearchContentProps> = ({isTransparent}) => {
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
      <SearchInput
        placeholder="컨텐츠를 검색해보세요"
        value={searchText}
        onChange={handleChange}
        onFocus={()=>{setIsOpen(searchText.length > 0)}}
        isTransparent={isTransparent}
      />
      { isOpen &&
        <SearchedList searchResults={searchResults} handleClose={()=>{setIsOpen(false)}}/>
      }
    </div>
  );
};

export default SearchContent;
