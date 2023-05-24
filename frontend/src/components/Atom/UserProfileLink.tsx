import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface UserProfileLinkProps {
  userId: number;
  profileUrl: string | null;
  nickname: string;
  handleClick?: ()=>void;
}

const UserProfileLink: React.FC<UserProfileLinkProps> = ({ userId, profileUrl, nickname, handleClick }) => {
  return (
    <Link to={`/user/${userId}`} onClick={handleClick}>
      <div className="flex items-center">
        {profileUrl 
          ? <img className="object-cover rounded-full h-8 w-8 mr-2" src={profileUrl} alt="Profile" />
          : <FaUser className="h-8 w-8 rounded-full bg-blue-200 text-gray-600 mr-2 p-1" />}
        <p>{nickname}</p>
      </div>
    </Link>
  );
};

export default UserProfileLink;
