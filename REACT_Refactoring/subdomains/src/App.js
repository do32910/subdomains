import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import DomainList from './DomainList';
import LoginPage from './LoginPage';
import PlanFormView from './PlanFormView';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/domains' component={DomainList} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/planform' component={PlanFormView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
