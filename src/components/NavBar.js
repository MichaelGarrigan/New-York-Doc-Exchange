import React from 'react';
import SearchBar from './SearchBar.js';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

import '../styles/NavBar.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
});

const NavBar = props => {
  const { classes } = props;
  
  return (
    <nav>
      <div class="nav-top-row">
        <div class="nav-title">New York Doc Exchange</div>
        <Fab 
          aria-label="Search"
          color="secondary" 
          className={classes.fab} 
          onClick={event => {props.toggleSearchNav(event)}}
          variant="extended"
        >
          <SearchIcon />
          Search
        </Fab>
      </div>
      {
        props.showSearchNav
          ? <SearchBar />
          : ""
      }
    </nav>
  );
};

export default withStyles(styles)(NavBar);