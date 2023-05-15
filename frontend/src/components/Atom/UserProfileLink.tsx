import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface UserProfileLinkProps {
  userId: number;
  profileURL: string | undefined;
  nickname: string;
  handleClick?: ()=>void;
}

const UserProfileLink: React.FC<UserProfileLinkProps> = ({ userId, profileURL, nickname, handleClick }) => {
  return (
    <Link to={`/user/${userId}`} onClick={handleClick}>
      <div className="flex items-center">
        {profileURL 
          ? <img className="rounded-full h-8 w-8 mr-2" src={profileURL} alt="Profile" />
          : <FaUser className="h-8 w-8 rounded-full bg-blue-200 text-gray-600 mr-2 p-1" />}
        <p>{nickname}</p>
      </div>
    </Link>
  );
};

export default UserProfileLink;
