import React, { Component } from 'react';
import TileTemplate from '../Layout/TileTemplate';
import './DomainSearch.css';

export default class DomainSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: "Sprawdź dostępność domeny",
            availability: "",
            availabilityMsg: ["Ta domena jest dostępna!", "Ta domena jest już zajęta"],
            shouldMsgBeDisplayed: false
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
                console.log("freeyo");
            }else if(availability === "taken"){
                console.log("takenyo");
            }
            this.setState({
                shouldMsgBeDisplayed: true
            })
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
        const searchBar = <div className="searchbar-container"><input placeholder="Wprowadź nazwę domeny..." name="domainSearchInput" id="searchinput"></input><button onClick={this.checkDomainAvailability}>Sprawdź dostępność</button>
        {this.state.shouldMsgBeDisplayed ? <span id="availabilityMsg">{this.state.availabilityMsg[1]}</span> : null}
        </div>;
        return (
            <TileTemplate header={this.state.header} content={searchBar} />
        )
    }
}