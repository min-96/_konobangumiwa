import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../../dummy/dummy_data";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import Profile from "../Organism/Profile";
import UserMovieList from "../Organism/UserMovieList";

interface PageProps {
};

const User: FC<PageProps> = ({ }) => {
  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userId]);

  return (
    <div className="w-full flex flex-col items-center">
      <Profile frameClassName="mt-6 shadow-border rounded-lg" nickname={"철수"}/>
      <UserMovieList frameClassName="mt-6 shadow-border rounded-lg"/>
    </div>
  );
};

export default User;