import React, {Component} from 'react';
import './LoggedInAs.css';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { doLogout } from "../../../../actions/auth";
import { bindActionCreators } from  'redux';

import { Redirect } from 'react-router';

class LoggedInAs extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedUser: this.props.username,
            loggedOut: false,
            isLoggedIn: this.props.isLoggedIn
        }
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.props.doLogout();
        this.setState({
            loggedOut: true
        })
    }
    render(){
        if(this.state.loggedOut === true){
                return <Redirect to="/login" />
        }
        return (
                <div className="logged-container">
                    {this.state.isLoggedIn ? (
                    <div className="logged-info">Zalogowany/a jako: <span className="user-name">{this.state.loggedUser}</span> <button id="logoutBtn" onClick={this.logout}>Wyloguj</button></div>
                    ) : (<div className="logged-info"><Link className="loginBtn" to="/login">Zaloguj</Link> <Link className="loginBtn" to="/register">Utwórz konto</Link></div>)}
                </div>
            ) 
    }
}

function mapStateToProps(state){
    return {
      isLoggedIn: state.isLoggedIn,
      username: state.username,
      token: state.token
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ doLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInAs); 