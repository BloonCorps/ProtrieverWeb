import React from 'react';

const footerStyle = {
  color: '#F5DEB3',
  backgroundColor: '#B59410',
};

const Footer = () => (
  <footer style={footerStyle} className="footer mt-auto py-3">
    <div className="container">
      <span>National Institutes of Health & Massachusetts Institute of Technology @ Copyright 2023</span>
    </div>
  </footer>
);

export default Footer;
