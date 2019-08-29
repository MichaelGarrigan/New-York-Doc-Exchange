import React, { useState } from 'react';

import Insurances from './Insurances.js';

import '../styles/Body.less';

const Cards = ({ data, className }) => {
  const [moreDetails, setMoreDetails] = useState(false);

  return (
    <div className={className}>

      <div className="doctor-upper-section">
      
        <div className="doctor-name-wrapper">
          <div className="doctor-name">{`${data.profile.first_name} ${data.profile.last_name}`}</div> 
          <div className="doctor-title">{data.profile.title ? `, ${data.profile.title}` : ''}</div>
        </div>

        <div className="doctor-avatar-and-button">
          <div 
            className="doctor-avatar"
            style={{backgroundImage: `url('${data.profile.image_url}')`}}
          ></div>

          <button 
            className="doctor-show-more-button"
            onClick={() => setMoreDetails(!moreDetails)}
          >
            {
              moreDetails
                ? 'Less Details' 
                : 'More Details'
            }
          </button>
        </div>
      </div>
      {
        moreDetails 
          ? ( 
              <div className="card-show-more">

                <div className="doctor-lower-categories">  
                  <p className="doctor-p">{`NPI # ${data.npi}`}</p>
                </div>

                <div className="doctor-lower-location-category">
                  <h2 className="doctor-h2">Locations</h2>
                  {
                    data.practices.length > 0
                      ? 
                        data.practices.map(loc => {
                          return (
                            <div 
                              className="doctor-location-details"
                              key={loc.name}
                            >
                              <p className="doctor-p">
                                {loc.name}
                              </p>
                              <br />
                              <p className="doctor-p">
                                {loc.visit_address.street}
                              </p>
                              <p className="doctor-p">
                                {`${loc.visit_address.city} ${loc.visit_address.state}, ${loc.visit_address.zip}`}
                              </p>
                              <br />
                              {
                                loc.phones.length > 0 
                                  ? (
                                      loc.phones.map(phone => (
                                        <p className="doctor-p" key={phone.number}>
                                          {`${phone.type}: ${phone.number}`}
                                        </p>
                                      ))
                                    )
                                  : "No Phone Number Provided"
                              }
                              <br />
                              <p className="doctor-p">
                                {
                                  loc.accepts_new_patients
                                    ? 'Accepting New Patients !!!'
                                    : 'NOT Accepting New Patients :('
                                }
                              </p>
                            </div>
                          );
                        })
                      : 'No Locations Provided'
                  }
                </div>

                <div className="doctor-lower-categories">
                  <h2 className="doctor-h2">Insurance(s)</h2>
                  <Insurances insurances={data.insurances} />
                </div>
              </div>
            )
          : ''
      }
    </div>
  );
}

export default Cards;