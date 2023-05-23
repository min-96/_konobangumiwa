import React, { useRef } from 'react';
import { User } from '../../../types/movie';
import { useOutsideAlerter } from '../../../hook/useOutsideAlerter';
import { RxExit } from 'react-icons/rx';
import { TbUser } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hook/UserContext';
import * as API from '../../../API/User';
import { useError } from '../../../hook/ErrorContext';

interface ProfileMenuProps {
  user: User;
  handleClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, handleClose }) => {
  const { setUser } = useUser();
  const { showError } = useError();

  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(menuRef, handleClose);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  function handleMyProfile() {
    navigate("/user/" + user.id);
    handleClose();
  }

  async function handleLogout() {
    try {
      await API.logoutUser();
      setUser(null);
    } catch (error : any) {
      showError('Logout Error', error.message);
    }
    handleClose();
  }

  return (
    <div ref={menuRef} className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-sm shadow-xl z-20 border border-black">
      <button onClick={handleMyProfile} className="profile-menubtn">
        <TbUser className="w-4 h-4 mr-4"/>
        내 프로필
      </button>
      <button onClick={handleLogout} className="profile-menubtn hover:bg-red-400">
        <RxExit className="w-4 h-4 mr-4"/>
        로그아웃
      </button>
    </div>
  );
};

export default ProfileMenu;
