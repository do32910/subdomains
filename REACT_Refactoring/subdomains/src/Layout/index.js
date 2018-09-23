import React, { Component } from 'react';
import './Layout.css';
import Header from './Header';
import MainNav from './MainNav';

class Layout extends Component {
  render() {
    return (
      <div>
          <Header />
          <MainNav />
      </div>
    );
  }
}

export default Layout;
