import React, {Component} from 'react';
import './LoggedInAs.css';

export default class LoggedInAs extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedUser: "seivad"
        }
    }
    render(){
        return (
            <div class="logged-info">Zalogowany/a jako: <span class="user-name">{this.state.loggedUser}</span></div>
        )
    }
}