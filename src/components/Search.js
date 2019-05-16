
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
    let coords = [];
    axios.get('/location', { params: { location: this.state.searchInputs.location } })
      .then( response => {
        coords = response.data;
        console.log('coords: ', coords)
        if (coords) {
          axios.get(
            '/search', 
            { params: { 
              ...this.state.searchInputs,
              location: coords
              } 
            }
            )
            .then( response => {
              console.log('/search response: ', response.data);
              // save doctor data to state
              this.props.setDoctorData(response.data);
              // save lat_long to state
              this.props.setLat_Long(coords)
              // set the view to main
              this.props.switchMainView('main');
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
            });
        } else {
          // coords is null 
          // handle by showing user an error message of no location found
          // and they should retry entering the location
        }
      })
      .catch( err => console.log(err));
      
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div class="search-wrapper">
        <form className="search-form noValidate autoComplete='off' ">
        
          <TextField
            label="location"
            margin="normal"
            onChange={this.handleInputChange('location')}
            value={this.state.searchInputs.location}
            variant="filled"
          />

          <TextField
            label="symptoms"
            margin="normal"
            onChange={this.handleInputChange('symptoms')}
            value={this.state.searchInputs.symptoms}
            variant="filled"
          />

          <TextField
            label="specialties"
            margin="normal"
            onChange={this.handleInputChange('specialties')}
            value={this.state.searchInputs.specialties}
            variant="filled"
          />

          <TextField
            label="insurance"
            margin="normal"
            onChange={this.handleInputChange('insurance')}
            value={this.state.searchInputs.insurance}
            variant="filled"
          />

          <TextField
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

        </form>
      </div>
    )
  }
}

//export default Search;
export default withStyles({})(Search);