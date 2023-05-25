import React, { useEffect, useState } from 'react';
import VerticalScrollFrame from '../../Template/VerticalScrollFrame';
import * as API from '../../../API/Animation';
import { Movie } from '../../../types/movie';
import MovieCard from '../Home/MovieCard';

interface FinderMovieListProps {
  selectTags: string[];
}

const FinderMovieList : React.FC<FinderMovieListProps> = ({selectTags}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await API.getMovies({queryName:"allAnimations"});
      const newMovies = response;
      setMovies((prev)=>[...prev, ...newMovies]);
      setHasMore(newMovies.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleFetchNextPage = () => {
    fetchMovies();
  };

  return (
    <VerticalScrollFrame
      fetchNextPage={handleFetchNextPage}
      isLoading={isLoading}
      hasMore={hasMore}
    >
    <div className="flex flex-wrap justify-between">
      {movies.map((movie, index) => (
        <div key={movie.id} className="w-[calc(25%-1px)] mb-1">
          <MovieCard movie={movie} ratio="75%" />
        </div>
      ))}
    </div>
    </VerticalScrollFrame>
  );
};

export default FinderMovieList;
