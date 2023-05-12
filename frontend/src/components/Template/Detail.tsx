import { FC } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail } from "../../types/movie";

interface PageProps {
};

const Detail: FC<PageProps> = ({}) => {
  const { contentId } = useParams();

  // ============= testcode ================
  // 이부분은 나중에 detail에 들어왔을때 Id 에 맞는 데이터를 가져와서 movie를 저장
  const movie : MovieDetail = {
    id: '1',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
    title: '영화 제목 1',
    rating: 4.5,
    detailImage: 'https://an2-img.amz.wtchn.net/image/v2/axdUycDL94O9VLxMQpsoCA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1KbklsMHNJbkFpT2lJdmRqSXZjM1J2Y21VdmFXMWhaMlV2TVRZNE1URTJORGt4TXpnM09EUTNNamMxTWlJc0luRWlPamd3TENKM0lqb3hPVEl3ZlEuN3B6SXljRnItbDFqdGdWaWV4RDdIUjc4QjMwVmRta1pMMkRiX2JDYWlQWQ'
  };
  // =======================================

  return (
    <div>
      <img src={movie.detailImage}/>
      <h2>Content ID: {contentId}</h2>
    </div>
  );
};

export default Detail;