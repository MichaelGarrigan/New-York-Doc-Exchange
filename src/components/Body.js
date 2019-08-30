import React from 'react';

import SideBar from './SideBar.js';
import Map from './Map.js';

import '../styles/Body.less';

export default props => {
  return (
    <main className="body-wrapper">

      <SideBar 
        docData={props.docData}
        clickedDoc={props.clickedDoc}
      />

      <Map 
        docData={props.docData} 
        latLong={props.latLong}
        setClickedDoc={props.setClickedDoc}
      />
    </main>
  )
};