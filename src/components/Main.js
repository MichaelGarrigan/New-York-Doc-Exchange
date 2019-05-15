import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { API_KEY_GEO } from '../server/helpers/config.js';
import specialties from '../server/helpers/data/specialties.js';

import '../styles/Main.css';

const defaultProps = {
  center: {
    lat: 40.730610,
    lng: -73.935242
  },
  zoom: 9
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Main extends Component {

  render() {
    return (
      <main className="main-wrapper">
        <div className="sidebar-wrapper">
          <button
            onClick={event => {
              event.preventDefault();
              console.log('specialties: ', specialties.length)
            }}
          >Languages</button>
          {
            this.props.data 
              ? (
                this.props.data.map(item => (<p key={item.npi}>{JSON.stringify(item)}</p>))
              ) : ""
          }
        </div>
        <div className="map-wrapper">
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact 
              bootstrapURLKeys={{ key: API_KEY_GEO }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={40.730610}
                lng={-73.935242}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;