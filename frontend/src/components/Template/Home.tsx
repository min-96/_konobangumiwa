import { FC } from "react";
import MovieList from "../Organism/Home/MovieList";

interface PageProps {
};

const Home: FC<PageProps> = ({}) => {
  return (
    <div>
      <h1>홈 페이지</h1>
      <MovieList listName="박스오피스 순위" />
    </div>
  );
};

export default Home;