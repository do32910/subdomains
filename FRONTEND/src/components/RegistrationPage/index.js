import React, { Component } from 'react';
import './RegistrationPage.css';
import { Redirect } from 'react-router'

export default class RegistrationPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: "Zarejestruj się",
            url: `https://api.subdom.name`,
            errorMessages: {
                emptyField: "Wszystkie pola muszą być wypełnione!",
                wrongLogin: "Login zawiera niedozwolone znaki",
                wrongEmail: "Niepoprawny format adresu e-mail",
                passwordConfirmationFailed: "Wprowadzone hasła muszą być identyczne!",
                wrongPswdLength: "Hasło powinno składać się z 6 do 20 znaków"
            },
            shouldMsgBeDisplayed: false,
            errorsToDisplay: [],
            redirect: false
        }
    }

    validateRegistrationForm(e){
        e.preventDefault();
        var userEmail = document.querySelector('#userEmail').value;
        var userName = document.querySelector('#userName').value;

        var nameReg = /^[a-z0-9]+$/;
        var emailReg = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;

        var password = document.querySelector('#password').value;
        var passwordRpt = document.querySelector('#passwordRpt').value;

        var errorListToDisplay = [];

        if(password.length <= 0 || passwordRpt.length <= 0 || userEmail.length <= 0 || userName.length <= 0){
            errorListToDisplay.push(this.state.errorMessages.emptyField);
            this.setState({
                errorsToDisplay: errorListToDisplay,
                shouldMsgBeDisplayed: true
            })
            return 0;
        }

        if(password !== passwordRpt){
            errorListToDisplay.push(this.state.errorMessages.passwordConfirmationFailed);
        }
        if(password.length <= 5 || password.length >= 21){
            errorListToDisplay.push(this.state.errorMessages.wrongPswdLength);
        }
        if(!nameReg.test(userName)){
            errorListToDisplay.push(this.state.errorMessages.wrongLogin);
        }
        if(!emailReg.test(userEmail)){
            errorListToDisplay.push(this.state.errorMessages.wrongEmail);
        }

        if(errorListToDisplay.length >= 1){
            this.setState({
                errorsToDisplay: errorListToDisplay,
                shouldMsgBeDisplayed: true
            })
            return 0;
        }
        fetch(`${this.state.url}/users/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": userName,
                "password": password,
                "email": userEmail,
                "first_name": "Mar",
                "last_name": "Chew"
             })
        }).then(
            (response) => response.json()
        ).then(
            this.setState({
                redirect: true
            })
        )


    }

    render(){

        if(this.state.redirect === true){
            return (
                <Redirect to="/login" />
            )
        }
        
        return (
            <div className="registrationForm">
            <label htmlFor="userName" className="registrationForm__label">Nazwa użytkownika:</label>
            <input type="text" className="registrationForm__input" id="userName" placeholder="Nazwa..." onChange={this.handleChange}/>
            <label htmlFor="userEmail" className="registrationForm__label">E-mail:</label>
            <input type="text" className="registrationForm__input" id="userEmail" placeholder="Nazwa..." onChange={this.handleChange}/>

            <label htmlFor="password" className="registrationForm__label">Hasło:</label>
            <input type="password" className="registrationForm__input" id="password" placeholder="Hasło..." onChange={this.handleChange}/>
            <label htmlFor="passwordRpt" className="registrationForm__label">Powtórz hasło:</label>
            <input type="password" className="registrationForm__input" id="passwordRpt" placeholder="Hasło..." onChange={this.handleChange}/>
            {(this.state.shouldMsgBeDisplayed) ? 
                 <span id="availabilityMsg">{this.state.errorsToDisplay[0]}</span> :  null}
            <input type="submit" className="registrationForm__submitBtn" id="registerSubmit" onClick={(e) => this.validateRegistrationForm(e)} value="Utwórz konto"/>
        </div>
        )
    }
}