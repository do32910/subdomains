import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
