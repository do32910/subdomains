import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DomainSearch.css';

export default class DomainSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: "http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/names",
            header: "Sprawdź dostępność domeny",
            shouldMsgBeDisplayed: false,
            availabilityMessage: "",
            messageColor: "#899878",
            shouldPurchaseBtnBeDisplayed: false
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
                    shouldPurchaseBtnBeDisplayed: true,
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
                shouldPurchaseBtnBeDisplayed: false
            })
        }
    }

    checkDomainAvailability(e){
        e.preventDefault();
        var searchInput = document.querySelector('#searchinput').value;
        if(searchInput.length === 0){
            return 0;
        }
        fetch(`${this.state.url}/${searchInput}`)
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
                            {this.state.shouldPurchaseBtnBeDisplayed ? <Link className="addToCart-button" to={{pathname: "/planform", state: {foo: "bar"}}}>Kup domenę</Link>: null}
                </div>
            </div>
        )
    }
}