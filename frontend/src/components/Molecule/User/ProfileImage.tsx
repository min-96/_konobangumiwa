import React, { useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import ModalFrame from '../../Template/ModalFrame';

interface ProfileImageProps {
}

const ProfileImage: React.FC<ProfileImageProps> = ({ }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState(imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempImageUrl(e.target.value);
  };

  function imageExists(url: string, callback: (b: boolean) => void) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  const handleSave = () => {
    if (tempImageUrl) {
      imageExists(tempImageUrl, exists => {
        if (exists) {
          setImageUrl(tempImageUrl);
          setShowModal(false);
        } else {
          alert('이미지 URL이 유효하지 않습니다. 다른 URL을 입력해주세요.');
        }
      });
    }
  };

  return (
    <>
      <div className="relative w-48 h-48 mb-4">
        {
          imageUrl ?
            <img
              className="rounded-full border border-gray-300 w-full h-full object-cover"
              src={imageUrl}
              alt="ProfileImage"
            />
            :
            <FaUser className="h-full w-full rounded-full bg-blue-200 text-gray-600 mr-2 p-1" />
        }
        <button
          className="absolute bottom-3 right-3 bg-white rounded-full"
          onClick={() => setShowModal(true)}
        >
          <MdCameraAlt className="bg-gray-300 rounded-full p-1 h-8 w-8" />
        </button>
      </div>
      {showModal && (
        <ModalFrame handleModalClose={() => setShowModal(false)}>
          <h2 className="mb-2">프로필 이미지 변경</h2>
          <div className="flex w-[400px]">
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={tempImageUrl || ''}
              onChange={handleImageChange}
            />
            <button
              className="bg-primary text-white ml-2 p-2 rounded w-[70px]"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </ModalFrame>
      )}
    </>
  );
};

export default ProfileImage;
