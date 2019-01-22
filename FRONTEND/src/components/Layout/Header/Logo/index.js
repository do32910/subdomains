import React, {Component} from 'react';
import logoPNG from '../../../../img/logo.png';
import './Logo.css';

export default class Logo extends Component{
    render(){
        return (
            <img src={logoPNG} alt="logo.png"/>
            // <div className="logo">eu.<span>pl</span></div>
        )
    }
}