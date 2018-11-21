import React, {Component} from 'react';
import './Header.css';
import Logo from './Logo';
import LoggedInAs from './LoggedInAs';

export default class Header extends Component{
    render(){
        return (
            <header>
                <Logo />
                <LoggedInAs />
            </header>
        )
    }
}