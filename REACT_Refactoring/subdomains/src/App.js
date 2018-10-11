import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import DomainList from './DomainList';
import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/domains' component={DomainList} />
        <Route exact path='/login' component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
