import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import SearchInput from './Molecule/Home/SearchInput';
import LoginModal from './Organism/LoginModal';
import { useUser } from '../hook/UserContext';
import NavbarProfile from './Molecule/Home/NavbarProfile';
import { useError } from '../hook/ErrorContext';

type ModalType = 'sign in' | 'sign up' | 'none';

interface NavigationBarProps {
  isWithoutPaddingContent: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({isWithoutPaddingContent}) => {
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('none');
  const { user } = useUser();

  const { showError } = useError();

  function testError() {
    showError('test', 'testmessage', 5000);
  }

  useEffect(() => {
    setIsTransparent(isWithoutPaddingContent);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) { // 스크롤이 50px 이상 내려가면 투명도를 변경
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };
    if (isWithoutPaddingContent) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isWithoutPaddingContent]);

  const handleModalOpen = (type: ModalType) => {
    setModalType(type);
  };

  const handleModalClose = () => {
    setModalType('none');
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const domain = searchParams.get('domain');
  
  return (
    <nav className={`navbar ${isTransparent ? 'transparent' : ''}`}>
      <div className={`navbar-item ml-4`}>
        <div className="pr-4">
          <Link to="/">
            <img src={`${isTransparent ? '/logo-white.svg' : '/logo-white.svg'}`} alt="Logo" className="w-48" />
          </Link>
        </div>
        <div className={`navbar-item`}>
          <div className={`p-1 text-border ${domain === 'animation' ? 'font-bold' : ''}`}>
            <Link to="/?domain=animation" className="hover:underline">
              애니메이션
            </Link>
          </div>

          <div className={`p-1 text-border ${domain === 'webtoon' ? 'font-bold' : ''}`}>
            <Link to="/?domain=webtoon" className="hover:underline">
              웹툰
            </Link>
          </div>
        </div>
      </div>
      <div className={`navbar-item`}>
        <SearchInput isTransparent={isTransparent} />
        {user ? (
          <NavbarProfile user={user} />
        ) : (
          <button className="p-2 border rounded-md hover:underline" onClick={()=>{handleModalOpen('sign in')}}>
            로그인
          </button>
        )}
        {/* 회원가입 기능 제거
        <div className="p-2 border rounded-md">
          <button className="hover:underline" onClick={()=>{handleModalOpen('sign up')}}>
            회원가입
          </button>
        </div> */}
      </div>
      {modalType !== 'none' && (
        <LoginModal handleClose={handleModalClose}/>
      )}
    </nav>
  );
};

export default NavigationBar;