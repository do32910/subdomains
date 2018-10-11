import React, {Component} from 'react';
import './LoginPage.css';
import TileTemplate from '../Layout/TileTemplate';

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: "Logowanie"
        }
    }
    render(){
        const content = (
            <form className="loginForm">
                <label for="loginName" className="loginForm__label">Nazwa użytkownika:</label>
                <input type="text" className="loginForm__input"name="loginName" placeholder="Nazwa..."/>
                <label for="password" className="loginForm__label">Hasło:</label>
                <input type="password" className="loginForm__input" name="password" placeholder="Hasło..."/>
                <input type="submit" className="loginForm__submitBtn" name="loginSubmit" value="Zaloguj się"/>
            </form>)
        return (
            <div className="loginContainer">
            <TileTemplate header={this.state.header} content={content}/>
            </div>
        )
    }
}