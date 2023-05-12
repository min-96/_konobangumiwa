import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Layout: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
