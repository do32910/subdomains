import React, {Component} from 'react';
import TileTemplateSmall from '../Layout/TileTemplateSmall';
import RegistrationPage from '../RegistrationPage';
import Header from '../Layout/Header';

export default class RegistrationPageView extends Component{
    render(){
        return (
            <div>
                <Header />
                <TileTemplateSmall header="Zarejestruj się" content={<RegistrationPage />}/>
            </div>
            
        )
    }
}
