import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MagGlass from './svg/MagGlass.js';
import Ticker from './Ticker.js';

import fastTicker from '../server/helpers/ticker/ticker-1.js';
import slowTicker from '../server/helpers/ticker/ticker-2.js';

import '../styles/Main.less';

const Main = props => {

  const [zipCode, setZipCode] = useState('');

  const submitZipCode = event => {

    // exchange user location input for lat/long coords
    let coords = [];
    axios.get('/location', { params: { location: zipCode } })
      .then( response => {
        coords = response.data;
        console.log('coords: ', coords)
        if (coords) {
          axios.get(
            '/search', 
            { params: { location: coords } }
            )
            .then( response => {
              console.log('/search response: ', response.data);

              // save to state
              props.setDocData(response.data);
              props.setLatLong(coords);
            })
            .catch( err => console.log(err));

            setZipCode('');
            // stop spinner
            props.setSpinner(false);
        } else {
          // coords is null 
          // handle by showing user an error message of no location found
          // and they should retry entering the location
        }
      })
      .catch( err => console.log(err));
      
  }

  
  return (
    <main>

      <section className="upper">
        <div className="upper-flex">

          <div className="upper-ticker-wrapper">
            <Ticker tickerData={fastTicker}/>
            <Ticker tickerData={slowTicker}/>
          </div>

          <div className="upper-building-wrapper"></div>

          <div className="upper-cta-wrapper">
            <div className="upper-grid-cta-wrapper">
              <input 
                className="upper-grid-cta-input" 
                min='10000' 
                max='99999'
                onChange={e => setZipCode(e.target.value) }

                placeholder='Enter a Zip Code ...'
                type='number'
                value={zipCode}
              />
              <Link to="/map">
                <div onClick={ e => submitZipCode(e) } >
                  <MagGlass className="upper-grid-svg-search" />
                </ div>
              </Link>
            </div>
          </div>
            
        </div>
            
         
      </section>

      <section className="hero-middle">
        <div className="flex-circles-center">

          <div className="circles-wrapper">
            <div className="circle-outline">
              <div 
                className="circle-icon icon-briefcase"
              >
              </div>
            </div>
            <div className="circle-text">
              Advanced searching by symptoms, specialists or insurances
            </div>
          </div>

          <div className="circles-wrapper">
            <div className="circle-outline">
              <div 
                className="circle-icon icon-stethoscope"
              >
              </div>
            </div>
            <div className="circle-text">
              Powered by the Better Doctor API
            </div>
          </div>

          <div className="circles-wrapper">
            <div className="circle-outline">
              <div 
                className="circle-icon icon-cloud-upload"
              >
              </div>
            </div>
            <div className="circle-text">
              Send the details and directions right to you phone or email.
            </div>
          </div>

        </div>
      </section>

      <section className="hero-lower">
    
        <div className="lower-wrapper">
          <div className="lower-title">
            You Deserve to Feel Great
          </div>

          <Link to="/" className="link">
            <button className="lower-call-to-action">
              Search Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Main;