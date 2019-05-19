import React from 'react';
import Cards from './Cards.js';

import '../styles/SideBar.css';

const SideBar = props => {
  console.log('doc Data in SideBar.js: ', props.doctorData)
  return (
    <div className="sidebar-wrapper">
      {
        props.doctorData
          ? (props.doctorData.map(doctor => {
              return (
                <Cards
                  key={doctor.npi}
                  data={doctor}
                />
              )
            }))
            : 'LOADING'
      }
    </div>
  )
};

export default SideBar;