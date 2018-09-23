import React, {Component} from 'react';
import './MainNav.css';

export default class MainNav extends Component{
    render(){
        return (
            <nav class="main-nav">
                <ul class="main-nav__list">
                    <li class="main-nav__item">list item 2</li>
                    <li class="main-nav__item">list item 2</li>
                    <li class="main-nav__item">list item 3</li>
                    <li class="main-nav__item">list item 1</li>
                    <li class="main-nav__item">list item 4</li>
                    <li class="main-nav__item">list item 5</li>
                    <li class="main-nav__item">list item 6</li>
                    <li class="main-nav__item">list item 7</li>
                    <li class="main-nav__item">list item 8</li>
                </ul>
            </nav>
        )
    }
}