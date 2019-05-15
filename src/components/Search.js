
import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import '../styles/Search.css';

const styles = theme => ({
  
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class Search extends Component {
  state = {
    searchInputs: {
      symptoms: '',
      specialties: '',
      insurance: '',
      language: '',
      location: ''
    }
  }

  handleInputChange = category => event => {
    this.setState({
      searchInputs: {
        [category]: event.target.value
      }
    })
  }

  submitSearchInputs = event => {
    event.preventDefault();

    // exchange user location input for lat/long coords
    let coords = {};
    axios.get('/location', { params: { location: this.state.searchInputs.location } })
      .then( response => {
        coords = response.data;
        console.log('back with coords: ', coords);
      })
      .catch( err => console.log(err));
      
    axios.get(
      '/search', 
      { params: { ...this.state.searchInputs } }
      )
      .then( response => {
        console.log('submit response: ', response)
      })
      .catch( err => console.log(err));

    // reset state back to empty strings
    this.setState({
      searchInputs: {
        symptoms: '',
        specialties: '',
        insurance: '',
        language: '',
        location: ''
      }
    })
  }

  defaultSearchInputs = event => {
    event.preventDefault();
    axios.get(
      '/default', 
      { params: { 
        // default attributes
       } }
      )
      .then( response => {
        console.log('submit response: ', response)
      })
      .catch( err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div class="search-wrapper">
        <form className="search-form noValidate autoComplete='off' ">
        
          <TextField
            // id="outlined-input-location"
            // className={classNames(classes.textField, classes.margin, classes.legend)}
            label="location"
            margin="normal"
            onChange={this.handleInputChange('location')}
            value={this.state.searchInputs.location}
            variant="filled"
          />

          <TextField
            // id="outlined-input-symptoms"
            // className={classNames(classes.textField, classes.margin, classes.legend)}
            label="symptoms"
            margin="normal"
            onChange={this.handleInputChange('symptoms')}
            value={this.state.searchInputs.symptoms}
            variant="filled"
          />

          <TextField
            // id="outlined-input-location"
            // className={classNames(classes.textField, classes.margin, classes.legend)}
            label="specialties"
            margin="normal"
            onChange={this.handleInputChange('specialties')}
            value={this.state.searchInputs.specialties}
            variant="filled"
          />

          <TextField
            // id="outlined-with-placeholder"
            // className={classes.textField}
            // className={classNames(classes.textField, classes.margin, classes.legend)}
            label="insurance"
            margin="normal"
            onChange={this.handleInputChange('insurance')}
            value={this.state.searchInputs.insurance}
            variant="filled"
          />

          <TextField
            // id="outlined-input-location"
            // className={classNames(classes.textField, classes.margin, classes.legend)}
            label="language"
            margin="normal"
            onChange={this.handleInputChange('language')}
            value={this.state.searchInputs.language}
            variant="filled"
          />
        
          <Fab
            variant="extended"
            size="medium"
            onClick={event => this.submitSearchInputs(event)}
            color="primary"
            aria-label="Add"
            className={classes.margin}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Apply Search
          </Fab>

          {/* <Fab
            variant="extended"
            size="medium"
            onClick={event => this.defaultSearchInputs(event)}
            color="secondary"
            aria-label="Add"
            className={classes.margin}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Default Search
          </Fab> */}

        </form>
      </div>
    )
  }
}

//export default Search;
export default withStyles({})(Search);