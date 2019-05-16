import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Search from './components/Search.js';
import Main from './components/Main.js';


class App extends Component {
  state = {
    mainView: 'hero',
    doctorData: '',
    lat_long: [40.730610, -73.935242]
  }

  setDoctorData = data => {
    this.setState({
      doctorData: data
    });
  }

  setLat_Long = coords => {
    this.setState({
      lat_long: coords
    });
  }

  switchMainView = view => {
    console.log('view: ', view);
    
    this.setState({
      mainView: view
    });
  }

  render() {
    console.log('doc Data in app.js: ', this.state.doctorData)
    const threeComponents = {
      hero: <Hero />,
      search: 
        <Search 
          setDoctorData={this.setDoctorData}
          setLat_Long={this.setLat_Long}
          switchMainView={this.switchMainView}
        />,
      main: 
        <Main
          doctorData={this.state.doctorData} 
          lat_long={this.state.lat_long}
        />
    }
    return (
      <div class="nyde-wrapper">
        <NavBar 
          switchMainView={this.switchMainView}
        />
        { threeComponents[this.state.mainView] }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));