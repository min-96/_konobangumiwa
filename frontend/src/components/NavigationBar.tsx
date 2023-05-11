import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        {/* 추가적인 네비게이션 항목을 여기에 추가할 수 있습니다 */}
      </ul>
    </nav>
  );
};

export default NavigationBar;