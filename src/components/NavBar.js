import React from 'react';
import { Link } from 'react-router-dom';

import ChartHeart from './svg/ChartHeart.js';
import MagGlass from './svg/MagGlass.js';
import '../styles/NavBar.less';

const NavBar = () => (
    <nav className="navbar-wrapper">

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

    </nav>
);


export default NavBar;