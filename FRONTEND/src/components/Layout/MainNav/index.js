import React, {Component} from 'react';
import './MainNav.css';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";

class MainNav extends Component{
    render(){
        return (
            <nav className="main-nav">
            <ul className="main-nav__list">
            <NavLink to="/dashboard" className="main-nav__item-link"><li className="main-nav__item">Wykup domenę</li></NavLink>
            <NavLink to="/domains" className="main-nav__item-link"><li className="main-nav__item">Twoje domeny</li></NavLink>
            <NavLink to="/account" className="main-nav__item-link"><li className="main-nav__item">Dane konta</li></NavLink>
            {/* admin */}
            {
                this.props.userId == 35 ? 
                (
                    <NavLink to="/subdomains" className="main-nav__item-link"><li className="main-nav__item">Wszystkie domeny</li></NavLink>
                    ) : null
                }
                {
                    this.props.userId == 35 ? 
                    (
                        <NavLink to="/users" className="main-nav__item-link"><li className="main-nav__item">Użytkownicy</li></NavLink>
                        ) : null
                    }
                    </ul>
                    </nav>
                    )
                }
            }
            
            
            
            function mapStateToProps(state){
                return {
                    isLoggedIn: state.isLoggedIn,
                    username: state.username,
                    token: state.token,
                    userId: state.userId
                }
            }
            
            export default connect(mapStateToProps)(MainNav); 