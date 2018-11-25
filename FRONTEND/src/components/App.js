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


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/" render={() => (  this.props.isLoggedIn ? ( <Redirect to="/account"/> ) : ( <Redirect to={{pathname: "/login", state: { from: "/dashboard"}}}/> ) ) }/>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/domains' component={DomainList} />
        <Route exact path='/login' render={() => <LoginPage isLoggedIn={this.props.isLoggedIn} username={this.props.username} token={this.props.token}/>} />
        <Route exact path='/planform' component={PlanFormView} />
        <Route exact path='/account' component={AccountDetailsView} />
        {/* <Route exact path="/" render={() => <Redirect to="/dashboard"/> }/> */}

        {/* the ones below are for testing only; delete after using */}
        <Route exact path='/load' component={LoadingPage} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
    return {
      isLoggedIn: state.isLoggedIn,
      username: state.username,
      token: state.token
    }
}

export default connect(mapStateToProps)(App); 