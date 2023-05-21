import React, { useState } from 'react';
import { User } from '../../../types/movie';
import ProfileMenu from './ProfileMenu';

interface NavbarProfileProps {
  user: User;
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center space-x-2">
        <img
          src={user.pictureUrl || ''}
          alt={user.displayName}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-border">{user.displayName}</span>
      </button>
      {isOpen && (
        <ProfileMenu user={user} handleClose={()=>{setIsOpen(!isOpen)}} />
      )}
    </div>
  );
};

export default NavbarProfile;
