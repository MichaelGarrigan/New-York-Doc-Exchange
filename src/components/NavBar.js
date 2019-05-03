import React from 'react';
import '../styles/NavBar.css';

const NavBar = props => (
  <nav>
    <div class="nav-title">New York Doc Exchange</div>
    <div class="nav-bottom-row">
      <button>Search</button>
      <button>Map</button>
      <button
        onClick={
          event => {
            props.retrieveData(event);
          }
        }
      >Data</button>
    </div>
  </nav>
);

export default NavBar;