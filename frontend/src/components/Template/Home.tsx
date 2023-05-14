import { FC } from "react";
import { movies } from "../../dummy/dummy_data";
import MovieList from "../Organism/MovieList";
import "./Home.css"; 

interface PageProps {
};

const Home: FC<PageProps> = ({}) => {
  
  
  // ============= testcode ================
  function shuffleAndSlice(array: any[], start:number, end:number) {
    return array.slice().sort(() => Math.random() - 0.5).slice(start, end + 1);
  }
  // ==============================

  return (
    <div className="home-page">
      <MovieList title="박스오피스 순위" movies={shuffleAndSlice(movies,0, 9)} fontSize="2xl" />
      <MovieList title="이번주 Top10" movies={shuffleAndSlice(movies, 2, 5)} fontSize="2xl" />
      <MovieList title="이번달 Top10" movies={shuffleAndSlice(movies, 0, 6)} fontSize="2xl" />
      <MovieList title="올해 Top10" movies={shuffleAndSlice(movies, 2, 3)} fontSize="2xl" />
    </div>
  );
};

export default Home;