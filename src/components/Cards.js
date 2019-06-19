import React, { Component } from 'react';

import Insurances from './Insurances.js';
import '../styles/Cards.css';

class Cards extends Component {
  state = {
    showMoreDetails: false
  }

  toggleShowMoreDetails = () => {
    this.setState(prevState => ({
      showMoreDetails: !prevState.showMoreDetails
    }));
  }

  render() {
    const { data } = this.props;
    return (
      <div 
        className={this.props.className}
      >

        <div className="doctor-upper-section">
          <div className="doctor-name">
            {`${data.profile.first_name} ${data.profile.last_name} ${data.profile.title ? `, ${data.profile.title}` : ''}`}
          </div>

          <div className="doctor-avatar-and-button">
            <div 
              className="doctor-avatar"
              style={{backgroundImage: `url('${data.profile.image_url}')`}}
            ></div>

            <button 
              className="doctor-show-more-button"
              onClick={() => this.toggleShowMoreDetails()}
            >
              {
                this.state.showMoreDetails
                  ? 'Less Details' 
                  : 'More Details'
              }
            </button>
          </div>
        </div>
        {
          this.state.showMoreDetails 
            ? ( 
                <div className="card-show-more">

                  <div className="doctor-lower-categories">  
                    <p className="doctor-p">
                      National Provider Identifier
                    </p>
                    <p className="doctor-p">
                      {data.npi}
                    </p>
                  </div>

                  <div className="doctor-lower-categories">
                    <h2 className="doctor-h2">Locations</h2>
                    {
                      data.practices.length > 0
                        ? 
                          data.practices.map(loc => {
                            return (
                              <div className="doctor-location-details">
                                <p className="doctor-p">
                                  {loc.name}
                                </p>
                                <p className="doctor-p">
                                  {loc.visit_address.street}
                                </p>
                                <p className="doctor-p">
                                  {`${loc.visit_address.city} ${loc.visit_address.state}, ${loc.visit_address.zip}`}
                                </p>
                                <p className="doctor-p">
                                  Phone:
                                </p>
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
                                <p className="doctor-p">
                                  {`Languages: ${loc.languages[0].name}`}
                                </p>
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
}

export default Cards;