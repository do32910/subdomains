import React, {Component} from 'react';
import Layout from '../Layout';
import TileTemplate from '../Layout/TileTemplate';
import PlanForm from '../PlanForm';

export default class PlanFormView extends Component{
    constructor(props){
        super(props);
        this.state = {
            domainToPurchase: ""
        }
    }
    render(){
        return (
            <Layout content={<TileTemplate header="Wybór abonamentu" content={<PlanForm />}/>}/>
        )
    }
}