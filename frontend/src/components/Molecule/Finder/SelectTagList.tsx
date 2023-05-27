import React from 'react';

interface SelectTagListProps {
  selectTags: string[];
  setSelectTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTagList: React.FC<SelectTagListProps> = ({ selectTags, setSelectTags }) => {
  const removeTag = (tag: string) => {
    setSelectTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];

  const getTagColor = (tag: string) => {
    const colorIndex = stringToColor(tag);
    return colors[colorIndex];
  };

  const stringToColor = (str: string) => {
    const hash = str.charCodeAt(0) % colors.length;
    return hash;
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {selectTags.map((tag) => (
        <div
          key={`sel_${tag}`}
          className={`flex items-center justify-center px-2 py-1 rounded-full text-white cursor-pointer ${getTagColor(
            tag
          )}`}
          onClick={() => removeTag(tag)}
        >
          <span className="text-xs font-semibold">{tag}</span>
          <span className="text-xs ml-1">&times;</span>
        </div>
      ))}
    </div>
  );
};

export default SelectTagList;
