import React, {Component} from 'react';
import logoPNG from '../../../../img/logo.png';
import './Logo.css';
import { Link } from 'react-router-dom';

export default class Logo extends Component{
    render(){
        return (
            <Link to="/"><img src={logoPNG} alt="logo.png" className="img-logo"/></Link>
            // <div className="logo">subdom.<span>name</span></div>
        )
    }
}