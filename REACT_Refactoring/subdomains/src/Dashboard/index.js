import React, { Component } from 'react';
import Layout from '../Layout';
import DomainSearch from '../DomainSearch';

export default class Dashboard extends Component{
    render(){
        const content = <DomainSearch/>
        return (
            <div>
            <Layout content={content} />
            </div>
        )
    }
}