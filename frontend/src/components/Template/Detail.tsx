import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieDetail } from "../../types/movie";
import ReviewList from "../Organism/ReviewList";
import MovieList from "../Organism/MovieList";
import DetailInfo from "../Organism/DetailInfo";
import DetailHeader from "../Organism/DetailHeader";

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
    id: 1,
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
    title: '영화 제목 1',
    grade: 900,
    release: 'release',
    reviewCount: 2000,
    backgroundImg: "https://thumbnail.laftel.net/items/full/14eefb9d-ceb9-403a-848c-b781f1271956.jpg",
    crops_ratio : 'crops_ratio',
    author: 'author',
    genreList: ['판타지', '게임'],
    introduction: '설명충',
  };
  // =======================================

  return (
    <div className="w-full flex flex-col items-center">
      <DetailHeader movie={movie} />
      <DetailInfo frameClassName="mt-6 shadow-border rounded-lg" title="기본정보"/>
      <ReviewList frameClassName="mt-6 shadow-border rounded-lg" title="리뷰"/>
      <MovieList frameClassName="mt-6 shadow-border rounded-lg" title="비슷한 애니메이션" queryName=""/>
    </div>
  );
};

export default Detail;