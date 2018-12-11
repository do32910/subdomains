import React, {Component} from 'react';
import TileTemplateSmall from '../Layout/TileTemplateSmall';
import RegistrationPage from '../RegistrationPage';

export default class RegistrationPageView extends Component{
    render(){
        return (
            <TileTemplateSmall header="Zarejestruj się" content={<RegistrationPage />}/>
        )
    }
}
