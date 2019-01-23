import React, {Component} from 'react';
import TileTemplateSmall from '../Layout/TileTemplateSmall';
import LoginPage from '../LoginPage';
import Header from '../Layout/Header';

export default class RegistrationPageView extends Component{
    render(){
        return (
            <div>
            <Header />
            <TileTemplateSmall header="Zaloguj się" content={<LoginPage />}/>
            
            </div>
            )
        }
    }
    