import React from 'react';

import SideBar from './SideBar.js';
import Map from './Map.js';

import '../styles/Body.css';

const Body = props => {
  return (
    <main className="body-wrapper">

      <SideBar doctorData={props.doctorData} />

      <Map 
        doctorData={props.doctorData} 
        lat_long={props.lat_long}
      />
    </main>
  )
};

export default Body;