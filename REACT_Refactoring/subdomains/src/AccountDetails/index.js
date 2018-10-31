import React, {Component} from 'react';
import './AccountDetails.css';

export default class AccountDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedUserId: "3",
            loggedUserData: {
                email: "",
                first_name: "",
                last_name: "",
                password: ""
            }
        }
    }

    componentDidMount(){
        fetch(`http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/users/${this.state.loggedUserId}`)
            .then(resp => resp.json())
            .then((retrievedData) => {
                this.setState({
                    email: retrievedData.email,
                    first_name: retrievedData.first_name,
                    last_name: retrievedData.last_name,
                    password: retrievedData.password
                })
            })
    }

    render(){
        return (
            <form className="user-data-form">
                <legend className="user-data-form_legend">Dane osobowe</legend>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="user-name">Imię</label>
                    <input className="user-data-form_input" type="text" id="user-name" placeholder={this.state.first_name} contenteditable="false"/>
                    <button className="user-data-form_change-btn hidden">Zapisz zmianę</button>
                </fieldset>
                <fieldset>
                <label className="user-data-form_label" htmlFor="user-lastname">Nazwisko</label>
                <input className="user-data-form_input" type="text" id="user-lastname" placeholder={this.state.last_name} />
                <button className="user-data-form_change-btn hidden">Zapisz zmianę</button>
                </fieldset>
                <legend className="user-data-form_legend">Dane konta</legend>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="user-email">E-mail</label>
                    <input className="user-data-form_input" type="email" id="user-email" placeholder={this.state.email}/>
                    <button className="user-data-form_change-btn hidden">Zapisz zmianę</button>
                </fieldset>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="user-pswd">Hasło</label>
                    <input className="user-data-form_input" type="password" id="user-pswd" placeholder={this.state.password}/>
                    <button className="user-data-form_change-btn hidden">Zapisz zmianę</button>
                </fieldset>
            </form>
        )
    }
}