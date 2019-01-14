import React, {Component} from 'react';
import './UserList.css';
import Layout from '../../Layout';
import TileTemplate from '../../Layout/TileTemplate';

export default class UserList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Layout content={<TileTemplate header={"Stas"} content={"Stacho"}/>}/>
        );
    }
}