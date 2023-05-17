import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../../dummy/dummy_data";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import UserInfo from "../Organism/UserInfo";
import Profile from "../Organism/Profile";

interface PageProps {
};

const User: FC<PageProps> = ({ }) => {
  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userId]);

  return (
    <div className="w-full flex flex-col items-center">
      <Profile frameClassName="mt-6 border border-blue-500 rounded-lg" nickname={"철수"}/>
      <ReviewList frameClassName="mt-6 border border-blue-500 rounded-lg" title="리뷰"/>
      <MovieList movies={movies} frameClassName="mt-6 border border-blue-500 rounded-lg" title="위시리스트"/>
    </div>
  );
};

export default User;