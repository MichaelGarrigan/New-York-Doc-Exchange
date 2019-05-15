import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Search from './components/Search.js';
import Main from './components/Main.js';

const threeComponents = {
  hero: <Hero />,
  search: <Search />,
  main: <Main />
}

class App extends Component {
  state = {
    mainView: 'hero'
  }

  retrieveData = (event) => {
    event.preventDefault();
    axios.get('/data')
      .then(response => {
        this.setState({
          data: response.data.data
        })
      })
  }

  switchMainView = (event, view) => {
    console.log('view: ', view);
    event.preventDefault();
    this.setState({
      mainView: view
    });
  }

  render() {
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