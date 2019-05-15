import React from 'react';

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
    <nav className="navbar-wrapper">

      <div class="nav-title"
        onClick={ event => props.switchMainView(event, 'hero') }
      >
        New York Doc Exchange
      </div>

      <Fab 
        aria-label="Search"
        color="secondary" 
        className={classes.fab} 
        onClick={ event => props.switchMainView(event, 'search') }
        variant="extended"
      >
        <SearchIcon />
        Search
      </Fab>
    
    </nav>
  );
};

export default withStyles(styles)(NavBar);