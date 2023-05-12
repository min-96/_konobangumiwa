import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps {
  // SearchInput 컴포넌트에 필요한 프롭스를 정의해주세요.
  // 예: onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어를 얻고 처리하는 로직을 구현해주세요.
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <div className="relative">
        <input
          type="text"
          placeholder="컨텐츠를 검색해보세요"
          value={searchTerm}
          onChange={handleChange}
          className="pl-8 pr-2 py-1 border border-gray-300 rounded text-gray-700"
        />
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
