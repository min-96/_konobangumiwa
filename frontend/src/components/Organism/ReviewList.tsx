import React, { useEffect, useRef, useState } from 'react';
import CardFrame from '../Template/CardFrame';
import ScrollFrame from '../Template/ScrollFrame';
import ReviewCard from '../Molecule/Detail/ReviewCard';
import ReviewModal from './ReviewModal';
import { Review, ReviewRelation, User } from '../../types/movie';
import { useMovie } from '../Template/Detail';
import * as API from '../../API/Review';
import { useError } from '../../hook/ErrorContext';

interface ReviewListProps {
  frameClassName: string;
  title: string;
}

const ReviewList: React.FC<ReviewListProps> = ({frameClassName, title}) => {
  const { movie } = useMovie();
  const [ reviews, setReviews ] = useState<ReviewRelation[]>([]);
  const [ page, setPage ] = useState(0);
  const { showError } = useError();
  const pageSize = 5;

  const reviewsRef = useRef<ReviewRelation[]>([]);
  const pageRef = useRef<number>(0);

  // State들의 최신 상태 유지
  useEffect(() => {
    reviewsRef.current = reviews;
  }, [reviews]);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  async function getReviews(p:number) {
    if (movie) {
      const ret = await API.getAnimationReviews({animationId: movie.id, page: p, pageSize: pageSize});
      setReviews([...reviewsRef.current, ...ret]);
      if (ret.length === pageSize)
        setPage(pageRef.current + 1);
      return (ret.length === pageSize);
    }
    return (false);
  }

  useEffect(() => {
    try {
      getReviews(page);
    }
    catch(e: any) {
      showError("fetch Review Error", e.message);
    }

  },[]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleScrollEnd = async () => {
    const ret = await getReviews(pageRef.current);
    return ret;
  }

  const handleCardClick = (review : Review, user : User) => {
    setSelectedReview(review);
    setSelectedUser(user);
  }

  const handleModalClose = () => {
    setSelectedReview(null);
    setSelectedUser(null);
  }

  if (!movie || !reviews.length) return null;

  return (
    <>
      <CardFrame className={frameClassName} title={title}>
        <ScrollFrame handleScrollEnd={handleScrollEnd}>
          {
            reviews.map((item) => (
              <ReviewCard 
                key={item.id} 
                review={item} 
                user={item.user}
                handleClick={() => handleCardClick(item, item.user)}
              />
            ))
          }
        </ScrollFrame>
      </CardFrame>
      {selectedReview && selectedUser && (
        <ReviewModal 
          review={selectedReview}
          setReview={setSelectedReview}
          targetUser={selectedUser}
          movie={movie}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ReviewList;
