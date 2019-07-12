
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { symptomsArray } from '../server/helpers/data/symptoms.js';
import { specialtiesArray } from '../server/helpers/data/specialties.js';
import { insuranceArray } from '../server/helpers/data/insurances.js';

import '../styles/Search.less';

const optMap = {
  symptoms: symptomsArray,
  specialties: specialtiesArray,
  insurance: insuranceArray
};

class Search extends Component {
  state = {
    searchInputs: {
      location: '',
      symptoms: '',
      specialties: '',
      insurance: ''
    },
    showAdvancedOptions: false,
    advancedOptionChosen: '',
    advancedOptions: {
      symptoms: symptomsArray,
      specialties: specialtiesArray,
      insurance: insuranceArray
    }
  }

  filterOptions = (array, str) => {
    let re = new RegExp(`^${str}`, 'i');
    
    return array.filter( item => re.test(item) )
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState( 
      prevState => ({
        searchInputs: {
          ...prevState.searchInputs,
          [name]: value
        }
      }));
  }

  handleInputChangeAdvanced = event => {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState( 
      prevState => ({
        searchInputs: {
          ...prevState.searchInputs,
          [name]: value
        }
      }), 
      () => {
        if (this.state.searchInputs[name].length > 0) {
          this.setState(prevState => ({ 
            advancedOptions: {
              ...prevState.advancedOptions,
              [name]: this.filterOptions(optMap[name], this.state.searchInputs[name])
            }
          }));
        } else {
          this.setState({ 
            advancedOptions: {
              symptoms: symptomsArray,
              specialties: specialtiesArray,
              insurance: insuranceArray
            }
          });
        }
      }
    );
  }

  handleAdvancedOption = event => {
    event.persist();
    
    const name = event.target.attributes.name.nodeValue;
    const option = event.target.attributes.option.nodeValue;
    console.log(name, option);
    
    this.setState(prevState => ({ 
      searchInputs: {
        ...prevState.searchInputs,
        [option] : name
      }
    }));
  }

  handleInputFocus = event => {
    const name = event.target.name;
    
    this.setState({ 
      showAdvancedOptions: true,
      advancedOptionChosen: event.target.name
    });
  }

  submitSearchInputs = event => {

    // exchange user location input for lat/long coords
    let coords = [];
    let loc = this.state.searchInputs.location || 'New York, NY';
    axios.get('/location', { params: { location: loc } })
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
    return (
      <div className="search-wrapper">
        <div className="search-flex">

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
                  onChange={this.handleInputChangeAdvanced}
                  onFocus={this.handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={this.state.searchInputs.symptoms}
                />
              </div>

              <div className="search-input-wrapper">
                <p>Specialties</p>
                <input
                  name="specialties"
                  onChange={this.handleInputChangeAdvanced}
                  onFocus={this.handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={this.state.searchInputs.specialties}
                />
              </div>

              <div className="search-input-wrapper">
                <p>Insurance</p>
                <input
                  name="insurance"
                  onChange={this.handleInputChangeAdvanced}
                  onFocus={this.handleInputFocus}
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
                  <div className="search-advanced-title">
                    {this.state.advancedOptionChosen}
                  </div>
                  {
                    this.state.advancedOptions[this.state.advancedOptionChosen].map( item => (
                      <div 
                        className="advanced-option-item"
                        key={item}
                        name={item}
                        onClick={event => this.handleAdvancedOption(event)}
                        option={this.state.advancedOptionChosen}
                      >
                        {item}
                      </div>
                    ))
                  }
                </div>
              ) : ""
          }
        </div>
      </div>
    )
  }
}

export default Search;