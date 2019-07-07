import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Body from './components/Body.js';
import Footer from './components/Footer.js';
import Main from './components/Main.js';
import NavBar from './components/NavBar.js';
import Search from './components/Search.js';
import Spinner from './components/Spinner.js';


const App = () => {

  const [docData, setDocData] = useState('');
  const [latLong, setLatLong] = useState([40.730610, -73.935242]);
  const [clickedDoc, setClickedDoc] = useState('');
  const [spinner, setSpinner] = useState(true);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavBar />
        
        <Switch>
          <Route exact path="/" render={
            () => (
              <Main 
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

                    setClickedDoc={setClickedDoc}
                  />
                ) 
            )} 
          />
        </Switch>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));