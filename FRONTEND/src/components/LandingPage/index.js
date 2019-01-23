import React, { Component } from 'react';
import './LandingPage.css';
import Header from '../Layout/Header';
import MainNav from '../Layout/MainNav';
import DomainSearchSimple from '../DomainSearchSimple';

export default class Layout extends Component {
    render() {
        return (
            <div>
            <Header />
            <div id="main-page-container">
            <DomainSearchSimple/>             
            </div>
            </div>
            );
        }
    }
    