import React, {Component} from 'react';
import TileTemplateSmall from '../Layout/TileTemplateSmall';
import LoginPage from '../LoginPage';

export default class RegistrationPageView extends Component{
    render(){
        return (
            <TileTemplateSmall header="Zaloguj się" content={<LoginPage />}/>
        )
    }
}
