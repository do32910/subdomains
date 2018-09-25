import React, { Component } from 'react';
import './Layout.css';
import Header from './Header';
import MainNav from './MainNav';
import TileTemplate from './TileTemplate';

export default class Layout extends Component {
  render() {
    return (
      <div>
          <Header />
          <div id="container">
          <MainNav />
          <main>{this.props.content}</main>
          </div>
      </div>
    );
  }
}
