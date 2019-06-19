import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/NavBar.css';

const NavBar = props => (
    <nav className="navbar-wrapper">

      <Link to="/">
        <div className="nav-title"
          onClick={ () => props.switchMainView('hero') }
        >
          New York Doc Exchange
        </div>
      </Link>

      <Link to="/search">
        <button
          className="navbar-search-button"
          onClick={ () => props.switchMainView('search') }
        >
          <div className="navbar-search-flex">
            <svg 
              className="icon-search"
              viewBox="0 0 25 25"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg" 
            >
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
            <span>Search</span>
          </div>
        </button>
      </Link>
    </nav>
);


export default NavBar;