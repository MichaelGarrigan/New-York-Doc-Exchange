import React from 'react';
// import Spinner from './Spinner.js';
import '../styles/Hero.less';

const Hero = props => (
  <main className="hero-wrapper">

    <section className="hero-upper">
      <div className="upper-flex-center">
        <div className="upper-grid">
          <div className="upper-grid-ticker">
          
          </div>
          <div className="upper-grid-icon-building">
          
          </div>
          <button className="upper-grid-call-to-action">
            FIND A DOC
          </button>
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
        <button className="lower-call-to-action">
          Search Now
        </button>
      </div>
    </section>
  </main>
);

export default Hero;