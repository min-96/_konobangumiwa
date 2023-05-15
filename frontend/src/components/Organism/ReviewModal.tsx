import React, { useEffect, useRef, useState } from 'react';
import { Review } from '../../types/movie';
import ModalFrame from '../Template/ModalFrame';
import { FaHeart } from 'react-icons/fa';
import { oneMovie } from '../../dummy/dummy_data';
import ReviewRating from '../Atom/ReviewRating';
import UserProfileLink from '../Atom/UserProfileLink';

interface ReviewModalProps {
  review: Review | null;
  handleClose: ()=>void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({review, handleClose}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review?.content || "");
  const editRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      const textarea = editRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);


  if (!review) return null;

  function handleSave() {
    setIsEditing(false);
    // api 콜
  }

  function handleDelete() {
    handleClose();
  }

  function handleEdit() {
    setIsEditing(true);
  }

  const movie = oneMovie;
  return (
    <ModalFrame handleModalClose={handleClose}>
      <div className="w-[500px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <UserProfileLink userId={review.id} nickname={review.nickname} profileURL={review.profileURL} handleClick={handleClose}/>
              <div className="ml-2">
                <ReviewRating rating={review.rating} />
              </div>
            </div>
            <p>{"영화제목"}</p>
            <p>{"상영날짜"}</p>
            <p>{"무비정보"}</p>
          </div>
          <img className="w-16" src={oneMovie.thumbnail} alt={oneMovie.title} />
        </div>
        <hr className="mt-2 mb-2"/>
        <div className="overflow-auto h-40">
          {isEditing ? (
            <textarea
              ref={editRef}
              className="w-full h-[95%] p-1 text-gray-700 bg-gray-100"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <p className="p-1" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>')}}/>
          )}
        </div>
        <hr className="mt-2 mb-2"/>
        <div className="flex justify-between">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-1" />
            <p>{review.id}</p>
          </div>
          <div>
            {isEditing ? (
              <button 
                className="bg-blue-500 text-white rounded px-2 py-1"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <>
                <button 
                  className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded px-2 py-1"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;