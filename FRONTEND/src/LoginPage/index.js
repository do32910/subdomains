import React, {Component} from 'react';
import './LoginPage.css';
import TileTemplate from '../Layout/TileTemplate';

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: `https://api.subdom.name`,
            header: "Logowanie",
            token: ""
        }
    }

    verifyLoginData = (e) => {
        e.preventDefault();
        var loginToVerify = document.querySelector("#loginName").value;
        var psswdToVerify = document.querySelector("#password").value;
        console.log(typeof loginToVerify);
        fetch(`${this.state.url}/login/`, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": "Dabi",
                "password": "endeavorsuccs"
            })
        }).then(
            (response) => response.json()
        ).then(
            responseData => this.setState({
                token: responseData.access_token
            })
        )
    }

    testingtesting = (e) => {
        e.preventDefault();
        console.log(this.state.token);

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
        const content = (
            <form className="loginForm">
                <label htmlFor="loginName" className="loginForm__label">Nazwa użytkownika:</label>
                <input type="text" className="loginForm__input" id="loginName" placeholder="Nazwa..."/>
                <label htmlFor="password" className="loginForm__label">Hasło:</label>
                <input type="password" className="loginForm__input" id="password" placeholder="Hasło..."/>
                <input type="submit" className="loginForm__submitBtn" id="loginSubmit" onClick={this.verifyLoginData} value="Zaloguj się"/>
                <button onClick={this.testingtesting}>a;kdlfhjgkadf</button>
            </form>)
        return (
            <div className="loginContainer">
            <TileTemplate header={this.state.header} content={content}/>
            </div>
        )
    }
}