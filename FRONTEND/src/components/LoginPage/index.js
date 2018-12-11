import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';
import TileTemplate from '../Layout/TileTemplate';
import { doLogin } from "../../actions/auth";
import { bindActionCreators, combineReducers } from  'redux';
import { connect } from "react-redux";


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
            //  "login": "Dabi",
            //  "password": "endeavorsuccs"
            })
        }).then(
            (response) => response.json()
        ).then(
            responseData => {
                if(responseData.message === "invalid credentials"){
                    this.printMessage("Niepoprawne dane logowania");
                    return 0;
                }
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

    // verifyLoginData = (e) => {
    //     e.preventDefault();
    //     var loginToVerify = document.querySelector("#loginName").value;
    //     var psswdToVerify = document.querySelector("#password").value;

    //     fetch(`${this.state.url}/login/`, {
    //         method: 'post',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "login": "Dabi",
    //             "password": "endeavorsuccs"
    //         })
    //     }).then(
    //         (response) => response.json()
    //     ).then(
    //         responseData => {
    //             this.props.doLogin("Dabi", responseData.access_token, responseData.user_id)
    //         }
    //     )
        
    // }

    testingtesting = (e) => {
        e.preventDefault();
        fetch(`${this.state.url}/users/`, {
        method: 'get',
        withCredentials: true,
        credentials: 'include',
        headers:{
            'Authorization': `Bearer ${this.state.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
            .then(r => r.json())
            .then(q => console.log(q))
        
    }




    render(){
        console.log(this.props.userId);
        const from = this.props.from ? this.props.from : '/';
        const auth = this.props;
        const loginForm = (
            <form className="loginForm">
                <label htmlFor="loginName" className="loginForm__label">Nazwa użytkownika:</label>
                <input type="text" className="loginForm__input" id="loginName" placeholder="Nazwa..." onChange={this.handleChange}/>
                <label htmlFor="password" className="loginForm__label">Hasło:</label>
                <input type="password" className="loginForm__input" id="password" placeholder="Hasło..." onChange={this.handleChange}/>
                <input type="submit" className="loginForm__submitBtn" id="loginSubmit" onClick={this.verifyLoginData} value="Zaloguj się"/>
                {(this.state.shouldMsgBeDisplayed) ? 
                    <span id="availabilityMsg">{this.state.validationMessage}</span> :  null}
            </form>)

        if (auth.isLoggedIn === true) {
            return <Redirect to={from} />
        }
        return (
            <div className="loginContainer">
            <TileTemplate header={this.state.header} content={loginForm}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ doLogin }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
