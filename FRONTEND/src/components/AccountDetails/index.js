import React, {Component} from 'react';
import './AccountDetails.css';

export default class AccountDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: "https://api.subdom.name",
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
        fetch(`${this.state.url}/users/${this.state.loggedUserId}`)
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


    changeUserData = (e, selectedInputId) => {
        e.preventDefault();
        var newValue = document.querySelector(`#${selectedInputId}`).value;
        var currentValue = document.querySelector(`#${selectedInputId}`).defaultValue;
        if(currentValue !== newValue){
            var dataToBeUpdated = {
                "columns": [selectedInputId],
                "values": [newValue]
            };
            fetch(`${this.state.url}/users/${this.state.loggedUserId}`, {
                method: 'PUT',
                body: JSON.stringify(dataToBeUpdated),
                headers:{
                    'Content-Type': 'application/json'
                  }
            }).then(res => res.json())
            .then(odp => console.log('msg:'))
        }
    }
//  IMPORTANT: INPUT IDS HAVE TO BE EXACTLY THE SAME AS NAMES OF VALUES FROM THE STATE THEY ARE TAKEN FROM, OTHERWISE CHANGEUSERDATA FUNCTION WILL BREAK
    render(){
        return (
            <form className="user-data-form">
                <legend className="user-data-form_legend">Dane osobowe</legend>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="first_name">Imię</label>
                    <input className="user-data-form_input" type="text" id="first_name" defaultValue={this.state.first_name} />
                    <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "first_name")}>Z</button>
                </fieldset>
                <fieldset>
                <label className="user-data-form_label" htmlFor="last_name">Nazwisko</label>
                <input className="user-data-form_input" type="text" id="last_name" defaultValue={this.state.last_name} />
                <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "last_name")}>Z</button>
                </fieldset>
                <legend className="user-data-form_legend">Dane konta</legend>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="email">E-mail</label>
                    <input className="user-data-form_input" type="email" id="email" defaultValue={this.state.email} />
                    <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "email")}>Z</button>
                </fieldset>
                <fieldset>
                    <label className="user-data-form_label" htmlFor="password">Hasło</label>
                    <input className="user-data-form_input" type="password" id="password" defaultValue={this.state.password} />
                    <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "password")}>Z</button>
                </fieldset>
            </form>
        )
    }
}