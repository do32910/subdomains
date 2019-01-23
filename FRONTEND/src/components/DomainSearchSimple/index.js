import React, { Component } from 'react';
import './DomainSearchSimple.css';
import { connect } from "react-redux";
import TileTemplate from '../Layout/TileTemplate';

import {reactLocalStorage} from 'reactjs-localstorage';
class DomainSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: "https://api.subdom.name/names",
            header: "Sprawdź dostępność domeny",
            shouldMsgBeDisplayed: false,
            availabilityMessage: "",
            messageColor: "#899878",
            token: this.props.token
        }
        this.checkDomainAvailability = this.checkDomainAvailability.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    printDomainAvailabilityMsg(){
        let availability = this.state.availability;
        if(availability.length === 0){
            this.setState({
                shouldMsgBeDisplayed: false
            });
        }else{
            if(availability === "free"){
                this.setState({
                    availabilityMessage: "Ta domena jest dostępna!",
                    shouldMsgBeDisplayed: true,
                    messageColor: "#899878"
                })
            }else if(availability === "taken"){
                this.setState({
                    availabilityMessage: "Ta domena jest już zajęta",
                    shouldMsgBeDisplayed: true,
                    messageColor: "#D52941"   
                })
            }
        }
    }

    handleChange(){
        if(this.state.shouldMsgBeDisplayed === true){
            this.setState({
                shouldMsgBeDisplayed: false,
            })
        }
    }

    checkDomainAvailability(e){
        e.preventDefault();
        var searchInput = document.querySelector('#searchinput').value;
        if(searchInput.length === 0){
            this.setState({
                availabilityMessage: "Wprowadź nazwę, która cię interesuje",
                shouldMsgBeDisplayed: true,
                messageColor: "#D52941"
            })
            return 0;
        }
        if(searchInput.length >= 50){
            this.setState({
                availabilityMessage: "Nazwa nie może być dłuższa niż 50 znaków",
                shouldMsgBeDisplayed: true,
                messageColor: "#D52941"
            })
            return 0;
        }
        if(!/^[a-z0-9\-]+$/.test(searchInput)){
            this.setState({
                availabilityMessage: "Niepoprawna nazwa domeny. Nazwa może zawierać tylko litery, cyfry oraz myślnik",
                shouldMsgBeDisplayed: true,
                messageColor: "#D52941"
            })
            return 0;
        }

        fetch(`${this.state.url}/${searchInput}`, {
            method: 'get',
            withCredentials: true,
            credentials: 'include',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then( resp => resp.text())
            .then( msg => { 
                msg = msg.substr(13,).slice(0,-2);  
                this.setState({
                    availability: msg}, 
                    this.printDomainAvailabilityMsg
                );
            });
    }

    render(){
        return (
            <div className="tile-template">
                <header className="tile-header">{this.state.header}</header>
                <div className="tile-content">
                    <div className="searchbar-container">
                        <input placeholder="Wprowadź nazwę domeny..." name="domainSearchInput" id="searchinput" onChange={this.handleChange}></input>
                        <button onClick={this.checkDomainAvailability}>Sprawdź dostępność</button>
                    </div>
                    {(this.state.shouldMsgBeDisplayed && this.state.availabilityMessage.length > 0) ? 
                            <span id="availabilityMsg" style={{color: this.state.messageColor}}>{this.state.availabilityMessage}</span> : null}
                </div>
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

export default connect(mapStateToProps)(DomainSearch); 