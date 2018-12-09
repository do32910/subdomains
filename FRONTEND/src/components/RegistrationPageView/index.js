import React, {Component} from 'react';
import TileTemplate from '../Layout/TileTemplate';
import Layout from '../Layout';
import RegistrationPage from '../RegistrationPage';

export default class RegistrationPageView extends Component{
    render(){
        return (
            <TileTemplate header="Zarejestruj się" content={<RegistrationPage />}/>
        )
    }
}
