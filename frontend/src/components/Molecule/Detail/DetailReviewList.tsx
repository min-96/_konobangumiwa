import React from 'react';
import { Review } from '../../../types/movie';
import CardFrame from '../../Template/CardFrame';
import ScrollFrame from '../../Template/ScrollFrame';
import ReviewCard from './ReviewCard';

interface DetailReviewListProps {
  frameClassName: string;
}

const DetailReviewList: React.FC<DetailReviewListProps> = ({frameClassName}) => {
  const reviews : Review[] = [
    {
      id: 1,
      profileURL: 'https://thumbs.dreamstime.com/b/brown-dog-corso-corso-stands-field-green-grass-brown-dog-corso-cors-120197441.jpg',
      nickname: '철수',
      rating: 4.5,
      content: '정말 좋아요!',
    },
    {
      id: 2,
      nickname: '영희',
      rating: 5.0,
      content: '철수랑 봤는데 재밌어요',
    },
    {
      id: 3,
      nickname: '바둑이',
      rating: 4.0,
      content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
    },
    {
      id: 4,
      nickname: '짱구',
      rating: 4.0,
      content: '정말재밋',
    },
    {
      id: 5,
      profileURL: 'https://thumbs.dreamstime.com/b/brown-dog-corso-corso-stands-field-green-grass-brown-dog-corso-cors-120197441.jpg',
      nickname: '흰둥이',
      rating: 4.0,
      content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
    },
    {
      id: 6,
      nickname: '영수',
      rating: 4.0,
      content: '나도재밋다',
    },
    {
      id: 7,
      nickname: '흰둥이부계정',
      rating: 5.0,
      content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
    },
  ]

  return (
    <CardFrame className={frameClassName} title="리뷰">
      <ScrollFrame>
        {
          reviews.map((item) => (
            <ReviewCard key={item.id} review={item} />
          ))
        }

      </ScrollFrame>
    </CardFrame>
  );
};

export default DetailReviewList;