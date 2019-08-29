import React from 'react';
import { Link } from 'react-router-dom';

import MagGlass from './svg/MagGlass.js';
import '../styles/NavBar.less';

export default () => (
    <nav className="navbar-wrapper">
      <div className="navbar-blue">
        <Link to="/" className="link-nav">
          <div className="nav-title">New York Doc Exchange</div>
        </Link>

        <Link 
          to="/search" 
          className="link-nav link-nav-search"
        >
          <MagGlass className="icon-search" />
          <span>Search</span>
        </Link>
      </div>
    </nav>
);