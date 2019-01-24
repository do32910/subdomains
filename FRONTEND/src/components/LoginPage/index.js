import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';
import { doLogin } from "../../actions/auth";
import { bindActionCreators } from  'redux';
import { connect } from "react-redux";

//
import {reactLocalStorage} from 'reactjs-localstorage';
//
class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: `https://api.subdom.name`,
            header: "Logowanie",
            token: "",
            redirectToReferrer: false,
            username: this.props.username,
            shouldMsgBeDisplayed: false,
            validationMessage: "aaa"
        }
    }

    handleChange = () => {
        if(this.state.shouldMsgBeDisplayed){
            this.setState({
                shouldMsgBeDisplayed: false
            })
        }
    }

    verifyLoginData = (e) => {
        e.preventDefault();
        var loginToVerify = document.querySelector("#loginName").value;
        var psswdToVerify = document.querySelector("#password").value;

        if(loginToVerify.length <= 0 || psswdToVerify.length <= 0){
            this.printMessage("Pola nie mogą być puste!");
            return 0;
        }

        fetch(`${this.state.url}/login/`, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": loginToVerify,
                "password": psswdToVerify
            })
        }).then(
            (response) => response.json()
        ).then(
            responseData => {
                if(responseData.message === "invalid credentials"){
                    this.printMessage("Niepoprawne dane logowania");
                    return 0;
                }
                localStorage.setItem('login', loginToVerify);
                localStorage.setItem('userId', responseData.user_id);
                localStorage.setItem('token', responseData.access_token);
                this.props.doLogin(loginToVerify, responseData.access_token, responseData.user_id)
            }
        )
    }

    printMessage = (msgContent) => {
        this.setState({
            shouldMsgBeDisplayed: true,
            validationMessage: msgContent
        });
    }

    render(){
        if(localStorage.getItem('token')){
            this.props.doLogin(localStorage.getItem('login'), localStorage.getItem('token'), localStorage.getItem('userId'))
        }
        const auth = this.props;
        if (auth.isLoggedIn === true) {
            // return <Redirect to={from} />
        }
        return (
            <div className="loginContainer">
            <form className="loginForm">
                <label htmlFor="loginName" className="loginForm__label">Nazwa użytkownika:</label>
                <input type="text" className="loginForm__input" id="loginName" placeholder="Nazwa..." onChange={this.handleChange}/>
                <label htmlFor="password" className="loginForm__label">Hasło:</label>
                <input type="password" className="loginForm__input" id="password" placeholder="Hasło..." onChange={this.handleChange}/>
                <input type="submit" className="loginForm__submitBtn" id="loginSubmit" onClick={this.verifyLoginData} value="Zaloguj się"/>
                {(this.state.shouldMsgBeDisplayed) ? 
                    <span id="availabilityMsg">{this.state.validationMessage}</span> :  null}
            </form>
            </div>
            )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ doLogin }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
