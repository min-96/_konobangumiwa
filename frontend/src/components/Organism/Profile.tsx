import React, { useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import ModalFrame from '../Template/ModalFrame';
import CardFrame from '../Template/CardFrame';
import { FaUser } from 'react-icons/fa';
import EditableTextarea from '../Atom/EditableTextarea';
import ProfileImage from '../Molecule/User/ProfileImage';

interface ProfileProps {
  nickname: string;
  frameClassName?: string;
}

const Profile: React.FC<ProfileProps> = ({ nickname, frameClassName }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState(imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempImageUrl(e.target.value);
  };

  function imageExists(url: string, callback: (b: boolean)=>void) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
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
    <CardFrame className={frameClassName} title=" ">
      <div className="flex flex-col items-center mb-4">
        <ProfileImage />
        <p className="font-bold text-2xl">{nickname}</p>
      </div>
      <EditableTextarea initContent={''} saveProcess={(content:string)=>{}} deleteProcess={()=>{}} align="center" maxChars={100} />

    </CardFrame>
  );
};

export default Profile;
