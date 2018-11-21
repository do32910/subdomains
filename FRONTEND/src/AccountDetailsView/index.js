import React, {Component} from 'react';
import TileTemplate from '../Layout/TileTemplate';
import Layout from '../Layout';
import AccountDetails from '../AccountDetails';

export default class AccountDetailsView extends Component{
    render(){
        return (
            <Layout content={<TileTemplate header="Twoje konto" content={<AccountDetails />}/>}/>
        )
    }
}