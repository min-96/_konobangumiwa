import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import './Layout.css';
import Footer from './Template/Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const pathsWithoutPadding = ['/contents/'];
  const isContentWithoutPadding = pathsWithoutPadding.some(path => location.pathname.includes(path));

  return (
    <div className="layout">
      <NavigationBar isWithoutPaddingContent={isContentWithoutPadding} />
      <div className={`content-wrapper ${isContentWithoutPadding ? 'no-padding' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
