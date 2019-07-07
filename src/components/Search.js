
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Search.less';

class Search extends Component {
  state = {
    searchInputs: {
      symptoms: '',
      specialties: '',
      insurance: '',
      language: '',
      location: ''
    },
    showAdvancedOptions: false,
    advancedOptions: []
  }

  handleInputChange = event => {
    event.persist();
    
    this.setState( prevState => ({
      searchInputs: {
        ...prevState.searchInputs,
        [event.target.name]: event.target.value
      }
    }));
  }

  submitSearchInputs = event => {

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
              this.props.setDocData(response.data);
              // save lat_long to state
              this.props.setLatLong(coords)
              // set the view to main
              this.props.setSpinner(false);
            })
            .catch( err => console.log(err));

            // reset state back to empty strings
            this.setState({
              searchInputs: {
                symptoms: '',
                specialties: '',
                insurance: '',
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

        <form className="search-form">
        
          <div className="search-input-wrapper">
            <p>Location</p>
            <input
              name="location"
              onChange={this.handleInputChange}
              placeholder="i.e. zip code, city, address"
              type="text"
              value={this.state.searchInputs.location}
            />
          </div>

          <div className="optional-input-wrapper">

            <div className="search-input-wrapper">
              <p>Symptoms</p>
              <input
                name="symptoms"
                onChange={this.handleInputChange}
                placeholder="type to filter options"
                type="text"
                value={this.state.searchInputs.symptoms}
              />
            </div>

            <div className="search-input-wrapper">
              <p>Specialties</p>
              <input
                name="specialties"
                onChange={this.handleInputChange}
                placeholder="type to filter options"
                type="text"
                value={this.state.searchInputs.specialties}
              />
            </div>

            <div className="search-input-wrapper">
              <p>Insurance</p>
              <input
                name="insurance"
                onChange={this.handleInputChange}
                placeholder="type to filter options"
                type="text"
                value={this.state.searchInputs.insurance}
              />
            </div>

          </div>

          <Link to="/map">
            <button
              className="search-apply-button"
              onClick={event => this.submitSearchInputs(event)}
            >
              <span>Apply Search</span>
            </button>
          </Link>
          
        </form>

        {
          this.state.showAdvancedOptions
            ? (
              <div className="search-advanced-options">
                {
                  this.state.advancedOptions.map( item => (
                    <div 
                      className="advanced-option-item"
                      key={item.uid}
                    >
                      {item.name}
                    </div>
                  ))
                }
              </div>
            ) : ""
        }
        
      </div>
    )
  }
}

export default Search;