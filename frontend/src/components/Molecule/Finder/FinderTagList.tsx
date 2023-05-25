import React, { useState, useEffect } from 'react';
import SearchInput from '../../Atom/SearchInput';
import { BsArrowClockwise } from 'react-icons/bs';

interface FinderTagListProps {
  selectTags: string[];
  setSelectTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const FinderTagList: React.FC<FinderTagListProps> = ({ selectTags, setSelectTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    // 임시 태그 데이터
    const dummyTags = [
      '판타지',
      '마법',
      '괴물',
      '이세계',
      '고등학생',
      '깽판',
      '게임',
      '드라마',
      '소설',
      '인터넷',
      '프로그래밍',
      '해킹',
      '신',
      '잔잔함'
    ];
    const dummyTags2 = Array.from({ length: 50 }, (v, i) => `${i + 1}`);
    setTags([...dummyTags, ...dummyTags2]);
    // 태그를 가져오는 비동기 로직
    // 데이터를 받아온 후 tags 상태 업데이트
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
