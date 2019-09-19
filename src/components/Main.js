import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Building from './svg/Building.js';
import MagGlass from './svg/MagGlass.js';
import Ticker from './Ticker.js';

import ticker from '../server/tickerText.js';

import '../styles/Main.less';

const { fastTicker, slowTicker } = ticker;

export default ({ height, width }) => {
  
  return (
    <main className="main-wrapper">

      <section className="upper">

        <div className="upper-ticker-wrapper">
          <Ticker tickerData={fastTicker}/>
          <Ticker tickerData={slowTicker}/>
        </div>

        <Building 
          height={Math.round(width * 0.4)}
          width={Math.round(width * 0.4)}
        />

        <div className="upper-search-wrapper">

          <Link 
            to="/search" 
            className="upper-search"
          >
            <MagGlass 
              className="icon-search" 
            />
            <p>Search</p>
          </Link>

        </div>
            
      </section>

      <section className="hero-middle">
        <div className="flex-circles-center">

          <div className="circles-wrapper circles-wrapper-briefcase">
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

          <div className="circles-wrapper circles-wrapper-stethoscope">
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

          <div className="circles-wrapper circles-wrapper-cloud-upload">
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

          <Link to="/search" className="lower-link">
            <button className="lower-call-to-action">
              Search Now !!
            </button>
          </Link>

      </section>
    </main>
  );
};