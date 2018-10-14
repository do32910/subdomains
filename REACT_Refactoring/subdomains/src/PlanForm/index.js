import React, {Component} from 'react';
import Layout from '../Layout';
import TileTemplate from '../Layout/TileTemplate';
import './PlanForm.css';

export default class PlanForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            domainToPurchase: "",
            availablePlans: [
                {duration: "Roczny", price: "61.50"},
                {duration: "Pięcioletni", price: "246"}
            ]
        }
    }
    render(){
        return (
            <form className="plan-form">
                <fieldset>
                <div className="plan-form__option">
                    <h2 className="plan-form__option-header">{this.state.availablePlans[0].duration}</h2>
                    <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[0].price} zł</span> (w tym 23% VAT)</span>
                    <span  className="plan-form__option-annual-pricing">{(this.state.availablePlans[0].price / 1).toFixed(2)}/rok</span>
                    <button className="plan-form__oprion-btn">Wybieram ten!</button>
                </div>
                <div className="plan-form__option">
                    <h2 className="plan-form__option-header">{this.state.availablePlans[1].duration}</h2>
                    <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[1].price} zł</span> (w tym 23% VAT)</span>
                    <span className="plan-form__option-annual-pricing">{(this.state.availablePlans[1].price / 5).toFixed(2)}/rok</span>
                    <button className="plan-form__option-btn">Wybieram ten!</button>
                </div>
                </fieldset>
                <button>Przejdź dalej</button>
            </form>
        )
    }
}