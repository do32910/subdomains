import React, {Component} from 'react';
import './LoadingPage.css';
import TileTemplate from '../Layout/TileTemplate';

export default class LoadingPage extends Component{
    render(){
        const loadingView = <div className="lds-ring" style={{"margin": " 50px calc(50% - 50px)"}}><div></div><div></div><div></div><div></div></div>
        return(
            <TileTemplate header="Poczekaj na przeniesienie do systemu płatności... " content={loadingView}/>
        )
    }
}