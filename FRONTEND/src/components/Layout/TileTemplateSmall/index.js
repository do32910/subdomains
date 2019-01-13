import React, {Component} from 'react';
import './TileTemplateSmall.css'

export default class TileTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: this.props.header,
            content: this.props.content
        }
    }
    render(){
        return (
            <div className="small-tile-template">
                <header className="small-tile-header">{this.state.header}</header>
                <div className="small-tile-content">{this.state.content}</div>
            </div>
        )
    }
}