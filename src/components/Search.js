
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    // start spinner
    this.props.switchMainView('spinner');

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
      <div className="search-wrapper">
        <form className="search-form noValidate autoComplete='off' ">
        
          <label>
            Location
            <input
              onChange={this.handleInputChange('location')}
              value={this.state.searchInputs.location}
            />
          </label>

          <label>
            Symptoms
            <input
              onChange={this.handleInputChange('symptoms')}
              value={this.state.searchInputs.symptoms}
            />
           </label>

          <label>
            Specialties
            <input
              onChange={this.handleInputChange('specialties')}
              value={this.state.searchInputs.specialties}
            />
          </label>

          <label>
            Insurance
            <input
              onChange={this.handleInputChange('insurance')}
              value={this.state.searchInputs.insurance}
            />
           </label>

           <label>
              Language
              <input
                onChange={this.handleInputChange('language')}
                value={this.state.searchInputs.language}
              />
           </label>

          <Link to="/map">
            <button
              className="search-apply-button"
              onClick={event => this.submitSearchInputs(event)}
            >
              <span>Apply Search</span>
            </button>
          </Link>
          
        </form>
      </div>
    )
  }
}

//export default Search;
export default Search;