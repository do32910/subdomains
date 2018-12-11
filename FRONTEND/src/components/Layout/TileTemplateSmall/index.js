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
            <div className="tile-template">
                <header className="tile-header">{this.state.header}</header>
                <div className="tile-content">{this.state.content}</div>
            </div>
        )
    }
}