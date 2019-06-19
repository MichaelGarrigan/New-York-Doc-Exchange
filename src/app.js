import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './components/Main.js';
import Body from './components/Body.js';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/search" component={Main} />
      <Route path="/map" component={Body} />
    </Switch>
</BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));