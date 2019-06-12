import React from 'react';
import GoogleMapReact from 'google-map-react';
import { API_KEY_GEO } from '../server/helpers/config.js';

import Pin from './Pin.js';
import '../styles/Map.css';

const AnyReactComponent = text => <div>{text}</div>;

const Map = props => {
  return (
    <div className="map-wrapper">
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: API_KEY_GEO }}
          defaultCenter={
            {
              lat: props.lat_long[0], 
              lng: props.lat_long[1]
            }
          }
          defaultZoom={11}
        >
          {
            props.doctorData.map( data => {
              <AnyReactComponent
                className="pin"
                key={data.npi}
                lat={data.practices[0].lat}
                lng={data.practices[0].lon}
                text={data.profile.first_name}
              />
            })
          }
        </GoogleMapReact>
      </div>
    </div>
  )
};

export default Map;

// Objects are not valid as a React child (found: object with keys {className, lat, lng, text, $hover, $getDimensions, $dimensionKey, $geoService, $onMouseAllow, $prerender}).