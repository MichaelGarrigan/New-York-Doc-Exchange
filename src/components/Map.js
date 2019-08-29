import React, { Component } from 'react';
import { API_KEY_MAP } from '../server/helpers/config.js';

import '../styles/Body.less';

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

    let markers = [];
    let infoWindows = [];

    // Generate array of Markers and stagger the drop animation
    this.props.docData.forEach( (data, index) => {

      infoWindows.push(
        new window.google.maps.InfoWindow({
          content: `
          <div className="map-infowindow">
            <p className="map-infowindow-p">${data.profile.slug}</p>
            <img src=${data.profile.image_url} />
          </div>`
        })
      )

      window.setTimeout( () => {
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
  
        marker.setLabel(`${index + 1}`);
        marker.addListener('click', () => this.props.setClickedDoc(marker.index));
        marker.addListener('mouseover', () => infoWindows[index].open(map, marker));
        marker.addListener('mouseout', () => infoWindows[index].close());

        markers.push(marker);

      }, 
      index * 100); // staggers the marker drop
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