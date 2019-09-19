import React from 'react';
import { Link } from 'react-router-dom';

import NydeFullTitle from './svg/NydeFullTitle.js';

import '../styles/NavBar.less';

export default ({ width }) => {
  
  const svgWidth = Math.round(width * 0.9);
  const svgHeight = Math.round(svgWidth * 0.1);

  return (
    <nav className="navbar-wrapper">
  
        <Link to="/" className="link-nav">
          <NydeFullTitle
            className="icon-nydefulltitle"
            height={svgHeight}
            width={svgWidth}
          />
        </Link>

    </nav>
  );
};