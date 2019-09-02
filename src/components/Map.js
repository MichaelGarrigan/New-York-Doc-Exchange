
import React, { useEffect, useLayoutEffect } from 'react';
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

export default props => {
  
  useEffect( () => {
    if (props.mapHasRenderedOnce === false) {
      renderMap();
      props.setMapHasRenderedOnce(true);
    } else {
      initMap();
    }
  }, [props.latLong[0], props.latLong[1]]);


  const renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY_MAP}&callback=initMap`);
    window.initMap = initMap;
  };

  const initMap = () => {
    let map = new window.google.maps.Map(
        document.getElementById('map-google'), 
        { 
          center: {
            lat: props.latLong[0], 
            lng: props.latLong[1]
          },
          zoom: 12
        }
    );

    let markers = [];
    let infoWindows = [];

    // Generate array of Markers and stagger the drop animation
    props.docData.forEach( (data, index) => {

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
  
        marker.setLabel(`${data.index}`);
        marker.addListener('click', () => props.setClickedDoc(marker.index));
        marker.addListener('mouseover', () => infoWindows[index].open(map, marker));
        marker.addListener('mouseout', () => infoWindows[index].close());

        markers.push(marker);

      }, 
      index * 100); // staggers the marker drop
    })
  };

  return (
    <div className="map-wrapper">
      <div id="map-google"></div>
    </div>
  );
};