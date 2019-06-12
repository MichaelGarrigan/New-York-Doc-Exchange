import React, { Component } from 'react';
import axios from 'axios';

import SideBar from './SideBar.js';
import Map from './Map.js';
import '../styles/Main.css';

const Main = props => {

  return (
    <main className="main-wrapper">
      <SideBar doctorData={props.doctorData} />

      <Map 
        doctorData={props.doctorData} 
        lat_long={props.lat_long}
      />
    </main>
  );
}

export default Main;