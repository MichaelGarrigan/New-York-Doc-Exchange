import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import useElementDimensions from './components/utils/elementDimensions.js';

import Body from './components/Body.js';
import Footer from './components/Footer.js';
import Main from './components/Main.js';
import NavBar from './components/NavBar.js';
import Search from './components/Search.js';
import Spinner from './components/Spinner.js';

import './styles/App.less';

const App = () => {

  const [clickedDoc, setClickedDoc] = useState('');
  const [docData, setDocData] = useState('');
  const [latLong, setLatLong] = useState([40.730610, -73.935242]);
  const [node, setNode] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [mapHasRenderedOnce, setMapHasRenderedOnce] = useState(false);

  let { sizeRef, dimensions } = useElementDimensions();

  return (
    <BrowserRouter>
      <div 
        ref={sizeRef}
        className="app-wrapper"
      >
        <div style={{ width: dimensions.width }}>

          <NavBar width={dimensions.width} />
          
          <Switch>
            <Route exact path="/" render={
              () => (
                <Main 
                  
                  width={dimensions.width}

                  setClickedDoc={setClickedDoc}
                  setDocData={setDocData}
                  setLatLong={setLatLong}
                  setSpinner={setSpinner}
                />
              )} 
            />

            <Route path="/search" render={
              () => (
                <Search 
                  setClickedDoc={setClickedDoc}
                  setDocData={setDocData}
                  setLatLong={setLatLong}
                  setSpinner={setSpinner}
                />
              )} 
            />

            <Route path="/map" render={
              () => (
                spinner 
                  ? <Spinner />
                  : (
                    <Body 
                      docData={docData}
                      clickedDoc={clickedDoc}
                      latLong={latLong}
                      mapHasRenderedOnce={mapHasRenderedOnce}

                      setMapHasRenderedOnce={setMapHasRenderedOnce}
                      setClickedDoc={setClickedDoc}
                    />
                  ) 
              )} 
            />
          </Switch>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));