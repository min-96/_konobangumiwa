import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../../dummy/dummy_data";
import { MovieDetail } from "../../types/movie";
import DetailHeader from "../Organism/DetailHeader";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import DetailInfo from "../Organism/DetailInfo";

interface PageProps {
};

const Detail: FC<PageProps> = ({ }) => {
  const { contentId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [contentId]);

  // ============= testcode ================
  // 이부분은 나중에 detail에 들어왔을때 Id 에 맞는 데이터를 가져와서 movie를 저장
  const movie: MovieDetail = {
    id: '1',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
    title: '영화 제목 1',
    rating: 4.5,
    detailImage: "https://thumbnail.laftel.net/items/full/14eefb9d-ceb9-403a-848c-b781f1271956.jpg"
  };
  // =======================================

  return (
    <div className="w-full flex flex-col items-center">
      <DetailHeader movie={movie} />
      <DetailInfo frameClassName="mt-6 border border-blue-500 rounded-lg"/>
      <ReviewList frameClassName="mt-6 border border-blue-500 rounded-lg"/>
      <MovieList movies={movies} frameClassName="mt-6 border border-blue-500 rounded-lg" title="비슷한 애니메이션"/>
    </div>
  );
};

export default Detail;