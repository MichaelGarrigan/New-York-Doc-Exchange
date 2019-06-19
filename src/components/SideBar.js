import React from 'react';
import Cards from './Cards.js';

import '../styles/SideBar.css';

const SideBar = props => (
    <div className="sidebar-wrapper">
      {
        props.clickedDoctor 
          ? (
            <Cards
              key={props.doctorData[props.clickedDoctor].npi}
              data={props.doctorData[props.clickedDoctor]}
              value={props.clickedDoctor}
              className="card-wrapper-clicked"
            />
          )
          : ''
      }
      {
        props.doctorData
          ? (props.doctorData.map( (doctor, index) => {
              return (
                <Cards
                  key={doctor.npi}
                  data={doctor}
                  value={index}
                  className="card-wrapper"
                />
              )
            }))
            : ''
      }
    </div>
);

export default SideBar;