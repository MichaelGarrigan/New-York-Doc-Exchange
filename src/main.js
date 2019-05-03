import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';

class App extends Component {
  state = {
    data: ""
  }

  retrieveData = (event) => {
    event.preventDefault();
    axios.get('/data')
      .then(response => {
        console.log('daCo: ', response.data)
        this.setState({
          data: response.data.data
        })
      })
  }

  render() {
    return (
      <div class="nyde-wrapper">
        <NavBar 
          retrieveData={this.retrieveData}
        />
        <Hero />
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