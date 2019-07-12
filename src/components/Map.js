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

  componentDidMount() { this.clearOldScripts(); this.renderMap(); }

  componentWillUnmount() { this.clearOldScripts(); }

  componentDidUpdate(prevProps) {
    if (prevProps.docData !== this.props.docData) {
      this.clearOldScripts()
      this.renderMap();
    }
    if (prevProps.latLong !== this.props.latLong) {
      this.clearOldScripts()
      this.renderMap();
    }
  }

  clearOldScripts = () => {
    let scripts = document.getElementsByTagName("head");
    let head = scripts[0];
    let children = head.childNodes;
    
    // console.log('children', children);
    for (let node of children) {
      // console.log(node.localName)
      if (node.localName === 'script') {
        console.log('deleted', node)
        head.removeChild(node);
      }
    }
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
            lat: this.props.latLong[0], 
            lng: this.props.latLong[1]
          },
          zoom: 12
        }
    );

    // generate array of markers
    this.props.docData.map( (data, index) => {
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
      marker.addListener('click', () => this.props.setClickedDoc(marker.index))
      return marker;
    })
    
  }

  render() {
    return (
      <div className="map-wrapper">
        <div id="map-google"></div>
      </div>
    )
  }
  
}

export default Map;