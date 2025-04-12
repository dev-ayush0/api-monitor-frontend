import React from 'react';
import Header from './header';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;