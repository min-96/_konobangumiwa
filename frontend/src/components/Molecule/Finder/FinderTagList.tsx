import React, { useState, useEffect } from 'react';
import SearchInput from '../../Atom/SearchInput';
import { BsArrowClockwise } from 'react-icons/bs';
import { useError } from '../../../hook/ErrorContext';
import * as API from '../../../API/Animation'

interface FinderTagListProps {
  selectTags: string[];
  setSelectTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const FinderTagList: React.FC<FinderTagListProps> = ({ selectTags, setSelectTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { showError } = useError();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const ret = await API.getAllGenres();
      setTags(ret.map((elem : any)=>(elem.type)));
    }
    catch (e:any) {
      showError("fetch Tags Error", e.message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagSelect = (tag: string) => {
    if (selectTags.includes(tag)) {
      setSelectTags(selectTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectTags([...selectTags, tag]);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-start overflow-y-auto h-full p-2 text-white">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 mx-2 mt-2">
          <p className="text-lg font-semibold">장르</p>
          <button
            className="text-xs hover:text-blue-500 font-semibold flex"
            onClick={()=>{setSelectTags([])}}
          >
            <BsArrowClockwise className="w-4 h-4 mr-1"/> 전체초기화
          </button>
        </div>
        <SearchInput
          placeholder="장르 검색"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <hr className="border-1 border-gray-300" />
      <div className="text-white text-sm mx-2">
        {filteredTags.map((tag) => {
          const checked = selectTags.includes(tag);
          return (
            <label
              key={tag}
              className={`flex items-center m-2 font-semibold ${checked && 'text-blue-300'}`}
            >
              <input
                type="checkbox"
                className="mr-3"
                checked={checked}
                onChange={() => handleTagSelect(tag)}
              />
              {tag}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FinderTagList;
