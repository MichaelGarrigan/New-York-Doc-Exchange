
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { symptomsArray } from '../server/helpers/data/symptoms.js';
import { specialtiesArray } from '../server/helpers/data/specialties.js';
import { insuranceArray } from '../server/helpers/data/insurances.js';
import addIndexProperty from './utils/addIndexProperty.js';

import '../styles/Search.less';

const arrayMap = {
  symptoms: symptomsArray,
  specialties: specialtiesArray,
  insurance: insuranceArray
};

export default props => {
  const [locationInput, setLocationInput] = useState('');

  const [optionalInputs, setOptionalInputs] = useState({
    symptoms: '',
    specialties: '',
    insurance: ''
  });

  const [optionalInputsBool, setOptionalInputsBool] = useState({
    symptoms: false,
    specialties: false,
    insurance: false
  });

  const [showOptionalArray, setShowOptionalArray] = useState(false);
  const [optionalInputChosen, setOptionalInputChosen] = useState('');

  const [optionalInputArray, setOptionalInputArray] = useState({
    symptoms: symptomsArray,
    specialties: specialtiesArray,
    insurance: insuranceArray
  });
  

  // Reduces the array based on what the user is inputing
  const filterOptions = (array, str) => {
    let re = new RegExp(`^${str}`, 'i');
    
    return array.filter( item => re.test(item) )
  };

  // Optional Input Handlers
  const handleOptionalChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setOptionalInputs({
      ...optionalInputs,
      [name]: value
    });

    setOptionalInputsBool({
      ...optionalInputsBool,
      [name] : false
    });

    if (value.length > 0) {
      setOptionalInputArray({
        ...optionalInputArray,
        [name]: filterOptions(arrayMap[name], value)
      });
    } else {
      setOptionalInputArray({
        symptoms: symptomsArray,
        specialties: specialtiesArray,
        insurance: insuranceArray
      })
    }
  };

  const handleLocationFocus = event => {
    setShowOptionalArray(false);
    setOptionalInputChosen('');
  };

  const handleInputFocus = event => {
    const name = event.target.name;
    
    setShowOptionalArray(true);
    setOptionalInputChosen(name);
  };
  
  const handleOptionalInputPreselect = (event, category) => {
    const name = event.target.attributes.name.nodeValue;
    const option = event.target.attributes.option.nodeValue;
    console.log('pre: ', name, option)
    setOptionalInputs({
      ...optionalInputs,
      [option] : name
    });

    setOptionalInputsBool({
      ...optionalInputsBool,
      [option] : true
    });
  };

  const submitSearchInputs = event => {
    // exchange user location input for lat/long coords
    let coords = [];
    let loc = locationInput || 'New York, NY';
    axios.get('/location', { params: { location: loc } })
      .then( response => {
        coords = response.data;
        
        if (coords) {
          axios.get(
            '/search', 
            { params: { ...optionalInputs, location: coords } }
          )
          .then( response => {
            let data = [...response.data];
            addIndexProperty(data);
            
            props.setDocData(data);
            props.setLatLong(coords)
            props.setSpinner(false);

            // reset state back to empty strings
            setLocationInput('');
            setOptionalInputs({
                symptoms: '',
                specialties: '',
                insurance: ''
            });
          })
          .catch( err => {
            console.log(err);

            // reset state back to empty strings
            setLocationInput('');
            setOptionalInputs({
                symptoms: '',
                specialties: '',
                insurance: ''
            });
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
                onChange={e => setLocationInput(e.target.value)}
                onFocus={handleLocationFocus}
                placeholder="i.e. zip code, city, address"
                type="text"
                value={locationInput}
              />
            </div>

            <div className="optional-input-wrapper">
              <p className="optional-input-optional">Optional</p>
              <div className={
                optionalInputsBool.symptoms 
                  ? "search-input-wrapper-true" 
                  : "search-input-wrapper"
                }
              >
                <p>Symptoms</p>
                <input
                  name="symptoms"
                  onChange={handleOptionalChange}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={optionalInputs.symptoms}
                />
              </div>

              <div className={
                optionalInputsBool.specialties 
                  ? "search-input-wrapper-true" 
                  : "search-input-wrapper"
                }
              >
                <p>Specialties</p>
                <input
                  name="specialties"
                  onChange={handleOptionalChange}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={optionalInputs.specialties}
                />
              </div>

              <div className={
                optionalInputsBool.insurance 
                  ? "search-input-wrapper-true" 
                  : "search-input-wrapper"
                }
              >
                <p>Insurance</p>
                <input
                  name="insurance"
                  onChange={handleOptionalChange}
                  onFocus={handleInputFocus}
                  placeholder="type to filter options"
                  type="text"
                  value={optionalInputs.insurance}
                />
              </div>

            </div>

            <Link to="/map">
              <button
                className="search-apply-button"
                onClick={submitSearchInputs}
              >
                <span>Apply Search</span>
              </button>
            </Link>
            
          </form>

          {
            showOptionalArray
              ? (
                <div className="search-advanced-options">
                  <div className="search-advanced-title">
                    {optionalInputChosen}
                  </div>
                  {
                    optionalInputArray[optionalInputChosen].map( item => (
                      <div 
                        className="advanced-option-item"
                        key={item}
                        name={item}
                        onClick={handleOptionalInputPreselect}
                        option={optionalInputChosen}
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
};