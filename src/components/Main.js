import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Main.less';
import Ticker from './Ticker.js';
import fastTicker from '../server/helpers/ticker/ticker-1.js';
import slowTicker from '../server/helpers/ticker/ticker-2.js';
import Building from './svg/Building.js';
import MagGlass from './svg/MagGlass.js';


const Main = props => {

  const [zipCode, setZipCode] = useState('');
  
  return (
    <main>

      <section className="upper">
       
          <div className="upper-grid">
            <div className="upper-grid-ticker">
              <Ticker tickerData={fastTicker}/>
              <Ticker tickerData={slowTicker}/>
            </div>
      
            <Building />
            
            <div className="upper-grid-cta">
              <div className="upper-grid-cta-wrapper">
                <input 
                  className="upper-grid-cta-input" 
                  min='10000' 
                  max='99999'
                  onChange={e => setZipCode(e.target.value) }

                  placeholder='Enter a Zip Code'
                  type='number'
                  value={zipCode}
                />
                <div
                  onClick={() => console.log('cta', zipCode)}
                >
                  <MagGlass className="upper-grid-svg-search" />
                </ div>
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
              Intuitive advanced searching by symptoms, specialists, insurances or language.
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
              Utilizing data from the powerful Better Doctor API.
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
              Find the right doctor and send the details and directions to you phone or email.
            </div>
          </div>

        </div>
      </section>

      <section className="hero-lower">
        <div className="lower-title">Find the right Doctor</div>
        <div className="lower-wrapper">
          <div className="lower-svg-chart-heart"></div>

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