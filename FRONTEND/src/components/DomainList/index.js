import React, {Component} from 'react';
import Layout from '../Layout';
import TileTemplate from '../Layout/TileTemplate';
import GETDomainList from '../GETDomainList';

export default class DomainList extends Component{
    constructor(props){
        super(props);
        this.state= {
            header: "Twoje domeny"
        }
    }
    
    render(){
        return (
            <Layout content={<TileTemplate header={this.state.header} content={<GETDomainList />}/>}/>
            )
        }
    }
