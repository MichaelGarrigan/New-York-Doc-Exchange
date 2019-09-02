import React from 'react';
import { Link } from 'react-router-dom';

import MagGlass from './svg/MagGlass.js';
import NydeFullTitle from './svg/NydeFullTitle.js';

import '../styles/NavBar.less';

export default props => {
  const width = props.dimensions.width;
  const titleWidth = Math.round(width * 0.7);
  const titleHeight = Math.round(titleWidth * 0.1);

  return (
    <nav className="navbar-wrapper">
      {/* <div className="navbar-blue"> */}
        <Link to="/" className="link-nav">
          <NydeFullTitle
            className="icon-nydefulltitle"
            height={titleHeight}
            width={titleWidth}
          />
          {/* <div className="nav-title">New York Doc Exchange</div> */}
          {/* <div className="nav-title"></div> */}
        </Link>

        <Link 
          to="/search" 
          className="link-nav link-nav-search"
        >
          <MagGlass className="icon-search" />
          <span>Search</span>
        </Link>
      {/* </div> */}
    </nav>
  );
};