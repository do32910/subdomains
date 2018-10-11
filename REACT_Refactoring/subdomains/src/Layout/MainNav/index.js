import React, {Component} from 'react';
import './MainNav.css';
import {NavLink} from 'react-router-dom';

export default class MainNav extends Component{
    render(){
        return (
            <nav className="main-nav">
                <ul className="main-nav__list">
                    <li className="main-nav__item"><NavLink to="/dashboard" className="main-nav__item-link">Wykup domenę</NavLink></li>
                    <li className="main-nav__item"><NavLink to="/domains" className="main-nav__item-link">Twoje domeny</NavLink></li>
                    <li className="main-nav__item">list item 3</li>
                    <li className="main-nav__item">list item 1</li>
                    <li className="main-nav__item">list item 4</li>
                    <li className="main-nav__item">list item 5</li>
                    <li className="main-nav__item">list item 6</li>
                    <li className="main-nav__item">list item 7</li>
                    <li className="main-nav__item">list item 8</li>
                </ul>
            </nav>
        )
    }
}