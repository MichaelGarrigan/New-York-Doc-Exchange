
import React, { useState, useEffect } from 'react';
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

const Search = props => {
  const [searchInputs, setSearchInputs] = useState({
    location: '',
    symptoms: '',
    specialties: '',
    insurance: ''
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [advancedOptionChosen, setAdvancedOptionChosen] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState({
    symptoms: symptomsArray,
    specialties: specialtiesArray,
    insurance: insuranceArray
  });
  

  // Reduces the array based on what the user is inputing
  const filterOptions = (array, str) => {
    let re = new RegExp(`^${str}`, 'i');
    
    return array.filter( item => re.test(item) )
  };

  // Used only with location input
  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    
    setSearchInputs({
      ...searchInputs,
      [name]: value
    });
  }

  // Used with the 3 optional inputs
  const handleInputChangeAdvanced = event => {
    const name = event.target.name;
    const value = event.target.value;

    setSearchInputs({
      ...searchInputs,
      [name]: value
    });

    useEffect( () => {
      if (searchInputs[name].length > 0) {
        setAdvancedOptions({
          ...advancedOptions,
          [name]: filterOptions(optMap[name], searchInputs[name])
        });
      } else {
        setAdvancedOptions({
          advancedOptions: {
            symptoms: symptomsArray,
            specialties: specialtiesArray,
            insurance: insuranceArray
          }
        })
      }
    }, [searchInputs] );
  }
    

  const handleAdvancedOption = event => {
    const name = event.target.attributes.name.nodeValue;
    const option = event.target.attributes.option.nodeValue;
    
    setSearchInputs({
      ...searchInputs,
      [option] : name
    });
  }

  const handleInputFocus = event => {
    const name = event.target.name;
    
    setShowAdvancedOptions(true);
    setAdvancedOptionChosen(name);
  }

  const submitSearchInputs = event => {
    // exchange user location input for lat/long coords
    let coords = [];
    let loc = searchInputs.location || 'New York, NY';
    axios.get('/location', { params: { location: loc } })
      .then( response => {
        
        coords = response.data;
        
        if (coords) {
          axios.get(
            '/search', 
            { params: { 
              ...searchInputs,
              location: coords
              } 
            }
            )
            .then( response => {
              // console.log('/search response: ', response.data);
              
              props.setDocData(response.data);
              props.setLatLong(coords)
              props.setSpinner(false);
            })
            .catch( err => console.log(err));

            // reset state back to empty strings
            setSearchInputs({
                symptoms: '',
                specialties: '',
                insurance: '',
                location: ''
            });
        } else {
          console.log('no coords available')
          // coords is null 
          // handle by showing user an error message of no location found
          // and they should retry entering the location
        }
      })
      .catch( err => console.log(err));
      
  }

    return (
      <div className="search-wrapper">
        <div className="search-flex">

          <form className="search-form">
          
            <div className="search-input-wrapper">
              <p>Location</p>
              <input
                name="location"
                onChange={handleInputChange}
                placeholder="i.e. zip code, city, address"
                type="text"
                value={searchInputs.location}
              />
            </div>

            <div className="optional-input-wrapper">

              <div className="search-input-wrapper">
                <p>Symptoms</p>
                <input
                  name="symptoms"
                  onChange={handleInputChangeAdvanced}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={searchInputs.symptoms}
                />
              </div>

              <div className="search-input-wrapper">
                <p>Specialties</p>
                <input
                  name="specialties"
                  onChange={handleInputChangeAdvanced}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={searchInputs.specialties}
                />
              </div>

              <div className="search-input-wrapper">
                <p>Insurance</p>
                <input
                  name="insurance"
                  onChange={handleInputChangeAdvanced}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={searchInputs.insurance}
                />
              </div>

            </div>

            <Link to="/map">
              <button
                className="search-apply-button"
                onClick={event => submitSearchInputs(event)}
              >
                <span>Apply Search</span>
              </button>
            </Link>
            
          </form>

          {
            showAdvancedOptions
              ? (
                <div className="search-advanced-options">
                  <div className="search-advanced-title">
                    {advancedOptionChosen}
                  </div>
                  {
                    advancedOptions[advancedOptionChosen].map( item => (
                      <div 
                        className="advanced-option-item"
                        key={item}
                        name={item}
                        onClick={event => handleAdvancedOption(event)}
                        option={advancedOptionChosen}
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

export default Search;