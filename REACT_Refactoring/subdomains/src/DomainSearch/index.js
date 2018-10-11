import React, { Component } from 'react';
import TileTemplate from '../Layout/TileTemplate';
import './DomainSearch.css';

export default class DomainSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: "Sprawdź dostępność domeny",
            shouldMsgBeDisplayed: false,
            availabilityMessage: ""
        }
        this.checkDomainAvailability = this.checkDomainAvailability.bind(this);
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
                    shouldMsgBeDisplayed: true
                })
            }else if(availability === "taken"){
                this.setState({
                    availabilityMessage: "Ta domena jest już zajęta",
                    shouldMsgBeDisplayed: true   
                })
            }
        }
    }

    checkDomainAvailability(e){
        e.preventDefault();
        var searchInput = document.querySelector('#searchinput').value;
        if(searchInput.length === 0){
            return 0;
        }
        fetch(`http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/names/${searchInput}`)
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
                        <input placeholder="Wprowadź nazwę domeny..." name="domainSearchInput" id="searchinput"></input>
                        <button onClick={this.checkDomainAvailability}>Sprawdź dostępność</button>
                        {(this.state.shouldMsgBeDisplayed && this.state.availabilityMessage.length > 0) ? <span>{this.state.availabilityMessage}</span> : null}
                    </div>
                </div>
            </div>
        )
    }
}