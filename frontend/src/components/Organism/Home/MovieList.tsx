import React from 'react';
import MovieCard from '../../Molecule/Home/MovieCard';

interface MovieListProps {
  listName: string;
};

const MovieList: React.FC<MovieListProps> = ({listName}) => {

  const movies = [
    {
      imageUrl: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
      altText: '영화 1',
      title: '영화 제목 1',
      rating: 4.5,
    },
    {
      imageUrl: 'https://an2-img.amz.wtchn.net/image/v2/p08ht7J3IwJCCljaQa2oPA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9ESTBNRGswTURrNE1ERTNNVFF5TmpraWZRLi1KamhSZDdvOTBoaGJYcy1YNXh1UDlyS1E0RE1oXzdlV0ZrYS1NRkNQcVk',
      altText: '영화 2',
      title: '영화 제목 2',
      rating: 3.8,
    },
    // 추가적인 영화 객체들...
  ];

  return (
    <div className="movie-list">
      <div>{listName}</div>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;