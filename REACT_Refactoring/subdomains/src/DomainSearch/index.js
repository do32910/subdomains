import React, { Component } from 'react';
import TileTemplate from '../Layout/TileTemplate';
import './DomainSearch.css';

export default class DomainSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: "Sprawdź dostępność domeny"
        }
    }
    render(){
        const searchBar = <div class="searchbar-container"><input placeholder="Wprowadź nazwę domeny..."></input><button>Sprawdź dostępność</button></div>;
        return (
            <TileTemplate header={this.state.header} content={searchBar} />
        )
    }
}