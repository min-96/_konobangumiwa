import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';

interface SearchInputProps {
  isTransparent?: boolean;
  placeholder: string;
  onKeyDown?: (event: any) => void;
  onFocus?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  isTransparent,
  placeholder,
  onKeyDown,
  onFocus,
  onChange,
  value,
  className,
}) => {

  const clearInput = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`pl-8 pr-2 py-1 border border-gray-700 rounded text-white w-full focus:outline-none
                    ${isTransparent ? 'bg-transparent text-border' : 'bg-primary'}`}
        onFocus={onFocus}
      />
      {value && (
        <div
          className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-auto"
          onClick={clearInput}
        >
          <TiDelete className={`text-white ${isTransparent && 'text-border'}`} />
        </div>
      )}
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <FiSearch className={`text-white ${isTransparent && 'text-border'}`} />
      </div>
    </div>
  );
};

export default SearchInput;
