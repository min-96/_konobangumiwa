import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import SearchInput from './Molecule/Home/SearchInput';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-item">
        <div className="pr-4">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-12 w-24" /> {/* 로고 이미지 경로 */}
          </Link>
        </div>
        <div className="navbar-item">
          <div className="p-1">
            <Link to="/?domain=animation" className="hover:underline">
              애니메이션
            </Link>
          </div>

          <div className="p-1">
            <Link to="/?domain=webtoon" className="hover:underline">
              웹툰
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-item">
        <SearchInput />
        <div className="p-2">
          <button className="hover:underline">로그인</button>
        </div>
        <div className="p-2 border rounded-md">
          <button className="hover:underline">회원가입</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;