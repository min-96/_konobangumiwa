import React, { useEffect, useRef, useState } from 'react';
import CardFrame from '../Template/CardFrame';
import HorizontalScrollFrame from '../Template/HorizontalScrollFrame';
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

const ReviewList: React.FC<ReviewListProps> = ({ frameClassName, title }) => {
  const { movie } = useMovie();
  const [reviews, setReviews] = useState<ReviewRelation[]>([]);
  const [page, setPage] = useState(0);
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

  const getReviews = async (p: number) => {
    try {
      if (movie) {
        const ret = await API.getAnimationReviews({
          animationId: movie.id,
          page: p,
          pageSize: pageSize,
        });
        setReviews((prev) => [...prev, ...ret]);
        setPage((prevPage) => prevPage + 1);
        return ret.length === pageSize;
      }
      return false;
    } catch (e: any) {
      showError('fetch Review Error', e.message);
      return false;
    }
  };

  useEffect(() => {
    getReviews(0);
  }, []);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleScrollEnd = async () => {
    const shouldLoadMore = await getReviews(pageRef.current);
    return shouldLoadMore;
  };

  const handleCardClick = (review: Review, user: User) => {
    setSelectedReview(review);
    setSelectedUser(user);
    console.log(review, user);
  };

  const handleModalClose = () => {
    setSelectedReview(null);
    setSelectedUser(null);
  };

  if (!movie) return null;

  return (
    <>
      <CardFrame className={frameClassName} title={title}>
        <HorizontalScrollFrame handleScrollEnd={handleScrollEnd}>
          {reviews.map((item) => (
            <ReviewCard
              key={`review_${item.id}`}
              review={item}
              user={item.user}
              handleClick={() => handleCardClick(item, item.user)}
            />
          ))}
        </HorizontalScrollFrame>
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
