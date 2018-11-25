import React, {Component} from 'react';
import './LoadingPage.css';
import Layout from '../Layout';
import TileTemplate from '../Layout/TileTemplate';

export default class LoadingPage extends Component{
    render(){
        const loadingView = <div className="lds-ring" style={{"margin": " 50px calc(50% - 50px)"}}><div></div><div></div><div></div><div></div></div>
        return(
            <Layout content={<TileTemplate header="Poczekaj na przeniesienie do systemu płatności... " content={loadingView}/>}/>
        )
    }
}