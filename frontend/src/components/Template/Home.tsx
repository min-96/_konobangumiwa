import { FC } from "react";
import { movies } from "../../dummy/dummy_data";
import MovieList from "../Organism/MovieList";
import "./Home.css"; 

interface PageProps {
};

const Home: FC<PageProps> = ({}) => {
  
  return (
    <div className="home-page">
      <MovieList title="인기순" fontSize="2xl" queryName="popularityAnimations"/>
      <MovieList title="최신순" fontSize="2xl" queryName="newAnimations" />
      <MovieList title="전체" fontSize="2xl" queryName="allAnimations" />
    </div>
  );
};

export default Home;