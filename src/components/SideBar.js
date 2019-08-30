import React from 'react';
import Cards from './Cards.js';

import '../styles/Body.less';

export default props => (
    <div className="sidebar-wrapper">
      {
        props.clickedDoc
          ? (
            <Cards
              key={props.docData[props.clickedDoc].npi}
              data={props.docData[props.clickedDoc]}
              value={props.clickedDoc}
              className="card-wrapper-clicked"
            />
          )
          : ''
      }
      {
        props.docData
          ? (props.docData.map( (doctor, index) => {
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