import React from 'react';
import './Navbar.css'; // Import the css file

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <a className="navbar-brand" href="#">
        <img src="logo32.png" alt="Protriever Logo"/> Protriever
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">By HGNC Name</a>
              <a className="dropdown-item" href="#">By Sequence</a>
              <a className="dropdown-item" href="#">By Functional Domain</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Interactive View</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
