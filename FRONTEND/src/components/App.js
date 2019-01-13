import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';
import Dashboard from './Dashboard';
import DomainList from './DomainList';
import LoginPage from './LoginPage';
import PlanFormView from './PlanFormView';
import LoadingPage from './LoadingPage';
import AccountDetailsView from './AccountDetailsView';
import RegistrationPageView from './RegistrationPageView';
import SubdomainList from './admin/SubdomainList';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* general */}
        <Route exact path="/" render={() => (  this.props.isLoggedIn ? ( <Redirect to="/account"/> ) : ( <Redirect to={{pathname: "/login", state: { from: "/dashboard"}}}/> ) ) }/>
        <Route exact path="/dashboard" render={() => (  this.props.isLoggedIn ? ( <Dashboard /> ) : ( <Redirect to={{pathname: "/login", state: { from: "/dashboard"}}}/> ) ) }/>
        <Route exact path="/domains" render={() => (  this.props.isLoggedIn ? ( <DomainList username={this.props.username} token={this.props.token}/> ) : ( <Redirect to={{pathname: "/login", state: { from: "/dashboard"}}}/> ) ) }/>
        <Route exact path='/login' render={() => <LoginPage isLoggedIn={this.props.isLoggedIn} username={this.props.username} token={this.props.token} userId={this.props.userId}/>} />
        <Route exact path="/account" render={() => (  this.props.isLoggedIn ? ( <AccountDetailsView /> ) : ( <Redirect to={{pathname: "/login", state: { from: "/dashboard"}}}/> ) ) }/>
        <Route exact path="/register" component={RegistrationPageView} />

        {/* admin */}
        <Route exact path="/subdomains" component={SubdomainList} />



        {/* the ones below are for testing only; delete after using */}
        <Route exact path='/load' component={LoadingPage} />
        <Route exact path='/planform' component={PlanFormView} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
    return {
      isLoggedIn: state.isLoggedIn,
      username: state.username,
      token: state.token,
      userId: state.userId
    }
}

export default connect(mapStateToProps)(App); 