import React from 'react';

const footerStyle = {
  color: '#F5DEB3',
  backgroundColor: '#B59410',
};

const Footer = () => (
  <footer style={footerStyle} className="footer mt-auto py-3">
    <div className="container">
    <em>National Institutes of Health & Massachusetts Institute of Technology © 2023</em>
    </div>
  </footer>
);

export default Footer;
