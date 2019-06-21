import React, { Component } from 'react';
import { API_KEY_MAP } from '../server/helpers/config.js';

import '../styles/Map.css';

const loadScript = url => {
  const firstScript = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  firstScript.parentNode.insertBefore(script, firstScript);
}

class Map extends Component {

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY_MAP}&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {
    let map = new window.google.maps.Map(
        document.getElementById('map-google'), 
        { 
          center: {
            lat: this.props.lat_long[0], 
            lng: this.props.lat_long[1]
          },
          zoom: 12
        }
    );

    // generate array of markers
    this.props.doctorData.map( (data, index) => {
      let marker = new window.google.maps.Marker({
        key: data.npi,
        index: index,
        title: data.profile.slug,
        animation: window.google.maps.Animation.DROP,
        value: index,
        map: map,
        position: {
          lat: data.practices[0].lat,
          lng: data.practices[0].lon
        }
      });
      marker.addListener('click', () => this.props.handleDocClick(marker.index))
      return marker;
    })
    
  }

  render () {
    return (
      <div className="map-wrapper">
        <div id="map-google"></div>
      </div>
    )
  }
}

export default Map;