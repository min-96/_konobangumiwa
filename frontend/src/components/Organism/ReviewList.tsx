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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      if (movie) {
        const ret = await API.getAnimationReviews({
          animationId: movie.id,
          page: p,
          pageSize: pageSize,
        });
        if (p === 0)
          setReviews(ret);
        else
          setReviews((prev) => [...prev, ...ret]);
        if (ret.length > 0)
          setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
        return ret.length > 0;
      }
      setIsLoading(false);
      return false;
    } catch (e: any) {
      showError('fetch Review Error', e.message);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    getReviews(0);
  }, [movie]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleScrollEnd = async () => {
    const shouldLoadMore = await getReviews(pageRef.current);
    return shouldLoadMore;
  };

  const handleCardClick = (review: Review, user: User) => {
    setSelectedReview(review);
    setSelectedUser(user);
  };

  const handleModalClose = () => {
    setSelectedReview(null);
    setSelectedUser(null);
  };

  if (!movie) return null;

  return (
    <>
      <CardFrame className={frameClassName} title={title}>
        <HorizontalScrollFrame key={`h_${movie.id}`} handleScrollEnd={handleScrollEnd} isLoading={isLoading}>
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
