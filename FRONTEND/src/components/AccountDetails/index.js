import React, {Component} from 'react';
import './AccountDetails.css';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { doLogin } from "../../actions/auth";
import { bindActionCreators } from  'redux';

class AccountDetails extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            url: "https://api.subdom.name",
            loggedUserId: this.props.userId,
            token: this.props.token,
            loggedUserData: {
                email: "",
                first_name: "",
                last_name: "",
                password: ""
            }
        }
    }
    
    componentDidMount(){
        fetch(`${this.state.url}/users/${this.state.loggedUserId}`, {
            method: 'get',
            withCredentials: true,
            credentials: 'include',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
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
            var inputToChange = document.querySelector(`#${selectedInputId}`);
            
            // console.log(inputToChange.disabled)
            if(inputToChange.disabled){
                inputToChange.disabled = false;
            }else{
                var newValue = document.querySelector(`#${selectedInputId}`).value;
                var currentValue = document.querySelector(`#${selectedInputId}`).defaultValue;
                //walidacja
                var nameReg = /^[a-zA-Z0-9\-]+$/;
                var emailReg = /^[a-z0-9\_\+\.\-]+@[a-z0-9]+\.[a-z0-9]+$/;
                if(newValue.length < 1){
                    return 0;
                }
                if(selectedInputId === "first_name" || selectedInputId === "last_name"){
                    if(!nameReg.test(newValue)){
                        return 0;
                    }
                }else if(selectedInputId === "email"){
                    if(!emailReg.test(newValue)){
                        return 0;
                    }
                }else if(selectedInputId === "password"){
                    if(newValue.length < 5 || newValue.length > 21){
                        return 0;
                    }
                }
                if(currentValue !== newValue){
                    var dataToBeUpdated = {
                        "columns": [selectedInputId],
                        "values": [newValue]
                    };
                    fetch(`${this.state.url}/users/${this.state.loggedUserId}`, {
                        method: 'PUT',
                        body: JSON.stringify(dataToBeUpdated),
                        headers:{
                            'Authorization': `Bearer ${this.state.token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }).then(res => res.json())
                }
                inputToChange.disabled = true;
            }
            
            // if(currentValue !== newValue){
            //     var dataToBeUpdated = {
            //         "columns": [selectedInputId],
            //         "values": [newValue]
            //     };
            //     fetch(`${this.state.url}/users/${this.state.loggedUserId}`, {
            //         method: 'PUT',
            //         body: JSON.stringify(dataToBeUpdated),
            //         headers:{
            //             'Authorization': `Bearer ${this.state.token}`,
            //             'Content-Type': 'application/json',
            //             'Accept': 'application/json'
            //           }
            //     }).then(res => res.json())
            // }


        }
        //  IMPORTANT: INPUT IDS HAVE TO BE EXACTLY THE SAME AS NAMES OF VALUES FROM THE STATE THEY ARE TAKEN FROM, OTHERWISE CHANGEUSERDATA FUNCTION WILL BREAK
        render(){
            // console.log(this.props.userId);
            return (
                <div className="user-data-form">
                <legend className="user-data-form_legend">Dane osobowe</legend>
                <span className="fieldset-container">
                <label className="user-data-form_label" htmlFor="first_name">Imię</label>
                <input className="user-data-form_input" type="text" id="first_name" defaultValue={this.state.first_name} disabled={true}/>
                {/* <span className="user-data-form_input" id="first_name" contentEditable={true}>{this.state.first_name}</span> */}
                <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "first_name")}><FontAwesomeIcon icon="pen" /></button>
                </span>
                <span className="fieldset-container">
                <label className="user-data-form_label" htmlFor="last_name">Nazwisko</label>
                <input className="user-data-form_input" type="text" id="last_name" defaultValue={this.state.last_name}  disabled={true}/>
                {/* <span className="user-data-form_input" id="last_name" contentEditable={false}>{this.state.last_name}</span> */}
                <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "last_name")}><FontAwesomeIcon icon="pen" /></button>
                </span>
                <legend className="user-data-form_legend">Dane konta</legend>
                <span className="fieldset-container">
                <label className="user-data-form_label" htmlFor="email">E-mail</label>
                <input className="user-data-form_input" type="email" id="email" defaultValue={this.state.email}  disabled={true}/>
                {/* <span className="user-data-form_input" id="email" contentEditable={false}>{this.state.email}</span> */}
                <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "email")}><FontAwesomeIcon icon="pen" /></button>
                </span>
                <span className="fieldset-container">
                <label className="user-data-form_label" htmlFor="password">Hasło</label>
                {/* <span className="user-data-form_input" id="password" contentEditable={false}>{this.state.password}</span> */}
                <input className="user-data-form_input" type="password" id="password" placeholder="********"  disabled={true}/>
                <button className="user-data-form_change-btn" onClick={(e) => this.changeUserData(e, "password")}><FontAwesomeIcon icon="pen" /></button>
                </span>
                </div>
                )
            }
        }
        
        function mapStateToProps(state){
            return {
                isLoggedIn: state.isLoggedIn,
                username: state.username,
                token: state.token,
                userId: state.userId
            }
        }

        
function mapDispatchToProps(dispatch){
    return bindActionCreators({ doLogin }, dispatch);
}
        
        export default connect(mapStateToProps)(AccountDetails); 