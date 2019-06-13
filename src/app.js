import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/NavBar.js';
import Main from './components/Main.js';


class App extends Component {
  state = {
    mainView: 'hero'
  }

  switchMainView = view => {
    console.log('view: ', view);
    
    this.setState({ mainView: view });
  }

  render() {
    return (
      <div className="nyde-wrapper">
        <NavBar 
          switchMainView={this.switchMainView}
        />
        <Main 
          mainView={this.state.mainView}
          switchMainView={this.switchMainView}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));