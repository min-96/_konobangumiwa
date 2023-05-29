import React, { useState } from 'react';
import { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

interface SearchedItemProps {
  movie: Movie;
}

const SearchedItem: React.FC<SearchedItemProps> = ({movie}) => {
  return (
    <Link to={`/contents/${movie.id}`}>
      <div className="p-2 px-4 text-sm truncate hover:bg-gray-600">
          {movie.title}
      </div>
    </Link>
  );
};

export default SearchedItem;
