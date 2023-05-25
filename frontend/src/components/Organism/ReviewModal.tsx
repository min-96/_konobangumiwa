import { Movie, MovieDetail, Review, ReviewUser, User } from '../../types/movie';
import ModalFrame from '../Template/ModalFrame';
import ReviewRating from '../Atom/ReviewRating';
import UserProfileLink from '../Atom/UserProfileLink';
import EditableTextarea from '../Atom/EditableTextarea';
import { useEffect, useState } from 'react';
import { useError } from '../../hook/ErrorContext';
import * as API_Animation from '../../API/Animation';
import MovieProfile from '../Atom/MovieProfile';
import MovieThumbnail from '../Atom/MovieThumbnail';
import { useUser } from '../../hook/UserContext';
import * as API_Review from '../../API/Review';

interface ReviewModalProps {
  review: Review;
  setReview: (review: Review) => void;
  targetUser: User;
  movie?: MovieDetail;
  handleClose: ()=>void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({review, setReview, targetUser, movie, handleClose}) => {
  const [movieData, setMovieData] = useState<MovieDetail | undefined>(movie);
  const { showError } = useError();
  const { user } = useUser();

  useEffect(()=>{
    async function fetchMovie() {
      const ret = await API_Animation.getMovieDetail({movieId: review.animationId});
      setMovieData(ret);
    }
    if (!movie) {
      try {
        fetchMovie();
      }
      catch (e: any) {
        showError("fetch Movie Error", e.message);
      }
    }
  }, []);

  if (!review || !movieData || !user) return null;

  return (
    <ModalFrame handleModalClose={handleClose}>
      <div className="w-[500px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <UserProfileLink userId={review.id} nickname={user.displayName} profileUrl={user.pictureUrl} handleClick={handleClose}/>
              <div className="ml-2">
                <ReviewRating rating={review.evaluation} />
              </div>
            </div>
            <MovieProfile movie={movieData} width="400px"/>
          </div>
          <div style={{width: '80px'}}>
            <MovieThumbnail src={movieData.thumbnail} alt={movieData.title} ratio={'150%'} />
          </div>
        </div>
        <hr className="mt-2 mb-2"/>
        <EditableTextarea
          inputHeight="40"
          initContent={review.comment}
          saveProcess={(content: string)=>{
            async function updateReview() {
              const ret = await API_Review.updateAnimationReview({
                id: review.id,
                animationId: review.animationId,
                evaluation: review.evaluation, 
                comment: content
              });
              setReview(ret);
            }
            try {
              updateReview();
            }
            catch (error: any) {
              showError('Save Review Error', error.message);
            }
          }}
          deleteProcess={()=>{
            async function deleteReview() {
              const ret = await API_Review.updateAnimationReview({
                id: review.id,
                animationId: review.animationId,
                evaluation: review.evaluation, 
                comment: ''
              });
              setReview(ret);
            }
            try {
              deleteReview();
            }
            catch (error: any) {
              showError('Delete Review Error', error.message);
            }
          }}
          align="left"
          maxChars={1000}
          isEditable={targetUser.id === user.id}
        />
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;