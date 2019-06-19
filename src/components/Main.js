import React, { Component } from 'react';

import Body from './Body.js';
import Hero from './Hero.js';
import NavBar from './NavBar.js';
import Search from './Search.js';
import Spinner from './Spinner.js';

class Main extends Component {
  state = {
    mainView: 'hero',

    doctorData: '',
    lat_long: [40.730610, -73.935242],
    clickedDoctor: ''
  }

  switchMainView = view => {
    console.log('view: ', view);
    
    this.setState({ mainView: view });
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

  handleDocClick = index => {
    console.log('idx: ', index)
    console.log('idx type: ', typeof index)
    this.setState({
      clickedDoctor: index
    });
  }

  render() {
    
    const threeComponents = {
      hero: <Hero />,
      spinner: <Spinner />,
      search: 
        <Search 
          setDoctorData={this.setDoctorData}
          setLat_Long={this.setLat_Long}
          switchMainView={this.switchMainView}
        />,
      main: 
        <Body
          mainView={this.state.mainView}
          switchMainView={this.switchMainView}
          doctorData={this.state.doctorData} 
          lat_long={this.state.lat_long}
          handleDocClick={this.handleDocClick}
          clickedDoctor={this.state.clickedDoctor}
        />
    }

    return (
      <div className="nyde-wrapper">
        <NavBar 
          switchMainView={this.switchMainView}
        />
        { threeComponents[this.state.mainView] }
      </div>
    )
  }
}

export default Main;