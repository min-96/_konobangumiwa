import React from 'react';

interface SelectTagListProps {
  selectTags: string[];
  setSelectTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTagList: React.FC<SelectTagListProps> = ({}) => {
  return (
    <div className="">
      <div className="">
        태그들
      </div>
    </div>
  );
};

export default SelectTagList;
