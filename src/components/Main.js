import React, { Component } from 'react';
import axios from 'axios';

import SideBar from './SideBar.js';
import GoogleMapReact from 'google-map-react';
import { API_KEY_GEO } from '../server/helpers/config.js';

import '../styles/Main.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Main extends Component {

  render() {
    return (
      <main className="main-wrapper">
        <SideBar doctorData={this.props.doctorData} />

        <div className="map-wrapper">
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact 
              bootstrapURLKeys={{ key: API_KEY_GEO }}
              defaultCenter={
                {
                  lat: this.props.lat_long[0], 
                  lng: this.props.lat_long[1]
                }
              }
              defaultZoom={11}
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