import React, {Component} from 'react';
import TileTemplate from '../../Layout/TileTemplate';
import Layout from '../../Layout';
import UserList from '../UserList';
// import { connect } from "react-redux";

export default class AccountDetailsView extends Component{
    render(){
        // console.log(this.props.username);
        return (
            <Layout content={<TileTemplate header="Twoje konto" content={<UserList />}/>}/>
        )
    }
}
