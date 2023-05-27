import { FC, createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieDetail } from "../../types/movie";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import DetailInfo from "../Organism/DetailInfo";
import DetailHeader from "../Organism/DetailHeader";
import * as API from "../../API/Animation";
import { useError } from "../../hook/ErrorContext";
import React from "react";
import CardFrame from "./CardFrame";

interface MovieContextType {
  movie: MovieDetail | null;
  setMovie: (review: MovieDetail | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovie = () => {
  const context = React.useContext(MovieContext);
  if (!context) {
    throw new Error("ReviewContext is not defined");
  }
  return context;
};

interface PageProps {
};

const Detail: FC<PageProps> = ({ }) => {
  const { contentId } = useParams();
  const [ movie, setMovie ] = useState<MovieDetail | null>(null);
  const { showError } = useError();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchMovieDetail() {
      try {
        if (contentId) {
          const data = await API.getMovieDetail({movieId: Number.parseInt(contentId)});
          setMovie(data);
        }
      } catch (error: any) {
        showError('Movie Fetch Error', error.message);
      }
    }
    if (contentId)
      fetchMovieDetail();
  }, [contentId]);

  if (!movie)
    return null;

  return (
    <MovieContext.Provider value={{movie, setMovie}}>
      <div className="w-full flex flex-col items-center mb-12">
        <DetailHeader />
        <DetailInfo frameClassName="mt-6 shadow-border rounded-lg" title="기본정보" />
        <ReviewList frameClassName="mt-6 shadow-border rounded-lg" title="리뷰" />
        <CardFrame className="mt-6 shadow-border rounded-lg" title="비슷한 애니메이션">
          <MovieList keyName="sim" queryName="similarAnimation" id={movie.id}/>
        </CardFrame>
      </div>
    </MovieContext.Provider>
  );
};

export default Detail;