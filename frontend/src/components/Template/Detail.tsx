import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieDetail } from "../../types/movie";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import DetailInfo from "../Organism/DetailInfo";
import DetailHeader from "../Organism/DetailHeader";
import * as API from "../../API/Animation";
import { useError } from "../../hook/ErrorContext";

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
    <div className="w-full flex flex-col items-center">
      <DetailHeader movie={movie} />
      <DetailInfo frameClassName="mt-6 shadow-border rounded-lg" title="기본정보" movie={movie}/>
      <ReviewList frameClassName="mt-6 shadow-border rounded-lg" title="리뷰" movieId={movie.id}/>
      <MovieList frameClassName="mt-6 shadow-border rounded-lg" title="비슷한 애니메이션" queryName=""/>
    </div>
  );
};

export default Detail;