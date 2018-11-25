import React, {Component} from 'react';
import './LoggedInAs.css';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { doLogout } from "../../../../actions/auth";
import { bindActionCreators } from  'redux';

class LoggedInAs extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedUser: this.props.username
        }
    }
    render(){
        return (
                <div>
                    {this.props.isLoggedIn ? (
                    <div className="logged-info">Zalogowany/a jako: <span className="user-name">{this.state.loggedUser}</span> <button id="logoutBtn" onClick={this.props.doLogout}>Wyloguj</button></div>
                    ) : (<div className="logged-info">Nie jesteś zalogowany <Link id="loginBtn" to="/login">Zaloguj</Link></div>)}
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