import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="layout-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
    <Navbar />
    <main style={{display: 'flex', flexGrow: 1}}>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
