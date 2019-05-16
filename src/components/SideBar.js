import React from 'react';

import '../styles/SideBar.css';

const SideBar = props => {
  console.log('doc Data in SideBar.js: ', props.doctorData)
  return (
    <div className="sidebar-wrapper">
      {
        props.doctorData
          ? (props.doctorData.map(doctor => {
              return (
                <div
                  className="doctor-card"
                  key={doctor.uid}
                >
                  <div className="doctor-name">
                    {`${doctor.profile.first_name} ${doctor.profile.last_name}`}
                  </div>
                  <div 
                    className="doctor-avatar"
                    style={{backgroundImage: `url('${doctor.profile.image_url}')`}}
                  ></div>
                  <div className="doctor-title">
                    {doctor.profile.title || 'MD'} 
                  </div>
                  <div className="doctor-language">
                    {doctor.profile.languages[0].name}
                  </div>
                  <div className="doctor-npi">
                    {doctor.npi}
                  </div>
                </div>
              )
            }))
            : 'LOADING'
      }
    </div>
  )
};

export default SideBar;