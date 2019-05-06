import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Main from './components/Main.js';

class App extends Component {
  state = {
    data: "",
    showHero: true,
    showSearchNav: false,
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

  toggleSearchNav = (event) => {
    event.preventDefault();
    this.setState( prevState => ({
      showSearchNav: !prevState.showSearchNav
    }))
  }

  render() {
    return (
      <div class="nyde-wrapper">
        <NavBar 
          toggleSearchNav={this.toggleSearchNav}
          showSearchNav={this.state.showSearchNav}
        />
        {
          this.state.showHero
            ? <Hero retrieveData={this.retrieveData} />
            : <Main data={this.state.data} />
        }

        {
          this.state.data 
            ? (
              this.state.data.map(item => (<p key={item.npi}>{JSON.stringify(item)}</p>))
            ) : ""
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));