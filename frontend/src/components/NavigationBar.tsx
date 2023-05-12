import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import SearchInput from './Molecule/Home/SearchInput';
import LoginModal from './Organism/LoginModal';

type ModalType = 'sign in' | 'sign up' | 'none';

interface NavigationBarProps {
  isWithoutPaddingContent: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({isWithoutPaddingContent}) => {
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('none');

  useEffect(() => {
    setIsTransparent(isWithoutPaddingContent);
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
          <div className={`p-1 ${domain === 'animation' ? 'font-bold' : ''}`}>
            <Link to="/?domain=animation" className="hover:underline">
              애니메이션
            </Link>
          </div>

          <div className={`p-1 ${domain === 'webtoon' ? 'font-bold' : ''}`}>
            <Link to="/?domain=webtoon" className="hover:underline">
              웹툰
            </Link>
          </div>
        </div>
      </div>
      <div className={`navbar-item`}>
        <SearchInput />
      </div>
      <div className={`navbar-item`}>
        <div className="p-2 border rounded-md">
          <button className="hover:underline" onClick={()=>{handleModalOpen('sign in')}}>
            로그인
          </button>
        </div>

        {/* 회원가입 기능 제거
        <div className="p-2 border rounded-md">
          <button className="hover:underline" onClick={()=>{handleModalOpen('sign up')}}>
            회원가입
          </button>
        </div> */}
      </div>
      {modalType !== 'none' && (
        <div className="modal-overlay" onClick={handleModalClose}>
          {/* modal-overlay영역을 클릭할땐 모달이 닫히고, modal을 클릭했을땐 닫히지 않도록함 */}
          <div
            className="modal"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}
          >
            <LoginModal handleModalClose={handleModalClose}/>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;