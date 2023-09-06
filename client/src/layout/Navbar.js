import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <a className="navbar-brand" href="/">
        <img src="/logo32.png" alt="Logo"/> Protriever
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
              <Link className="dropdown-item" to="/search/">By HGNC Name</Link>
              <Link className="dropdown-item" to="/search/">By Sequence</Link>
              <Link className="dropdown-item" to="/search/">By Functional Domain</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="interactiveViewDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Interactive View
            </a>
            <div className="dropdown-menu dropdown-menu-left-adjust" aria-labelledby="interactiveViewDropdown">
              <a className="dropdown-item" href="/">Canonical Proteome</a>
              <a className="dropdown-item" href="/disordered/">Disordered Regions</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
