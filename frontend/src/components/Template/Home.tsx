import { FC } from "react";
import MovieList from "../Organism/MovieList";
import "./Home.css"; 
import CardFrame from "./CardFrame";

interface PageProps {
};

const Home: FC<PageProps> = ({}) => {
  
  return (
    <div className="home-page">
      <CardFrame title="인기순" fontSize="2xl">
        <MovieList queryName="popularityAnimations"/>
      </CardFrame>
      <CardFrame title="최신순" fontSize="2xl">
        <MovieList queryName="newAnimations" />
      </CardFrame>
      {/* <MovieList title="전체" fontSize="2xl" queryName="allAnimations" /> */}
    </div>
  );
};

export default Home;