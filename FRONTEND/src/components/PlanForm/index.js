import React, {Component} from 'react';
import './PlanForm.css';
import DomainPurchaseIP from '../DomainPurchaseIP';
import DomainProlong from '../DomainProlong';

export default class PlanForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            availablePlans: [
                {duration: "Roczny", price: "61.50", durationInInt: 1},
                {duration: "Pięcioletni", price: "246", durationInInt: 5}
            ],
            proceed: false,
            selectedPlan: undefined,
            operationType: this.props.operationType
        }
    }
    
    selectPlan(e, index){
        e.preventDefault();
        let selectedPlan = document.querySelector(`#plan-${index}`);
        document.querySelectorAll(`.plan-form__option`).forEach((el) => {
            el.classList.remove('selected');
        });
        selectedPlan.classList.add('selected');
        this.setState({
            selectedPlan: this.state.availablePlans[index].durationInInt
        })
    }
    
    submitForm(e){
        e.preventDefault();
        this.setState({
            proceed: true
        })
    }
    render(){
        if(this.state.proceed){
            if(this.state.operationType === "purchase"){
                return <DomainPurchaseIP domainToPurchase={this.props.domainToPurchase} selectedPlan={this.state.selectedPlan}/>
            }else if(this.state.operationType === "prolong"){
                return <DomainProlong domainToPurchase={this.props.domainToPurchase} selectedPlan={this.state.selectedPlan}/>
            }
        }
        return (
            <form className="plan-form">
            <header className="tile-header">Wybór abonamentu</header>
            <fieldset>
            <div className="plan-form__option" id="plan-0">
            <h2 className="plan-form__option-header">{this.state.availablePlans[0].duration}</h2>
            <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[0].price} zł</span> (w tym 23% VAT)</span>
            <span  className="plan-form__option-annual-pricing">{(this.state.availablePlans[0].price / 1).toFixed(2)}/rok</span>
            <button className="plan-form__option-btn" onClick={(e) => this.selectPlan(e, 0)}>Wybieram ten!</button>
            </div>
            <div className="plan-form__option" id="plan-1">
            <h2 className="plan-form__option-header">{this.state.availablePlans[1].duration}</h2>
            <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[1].price} zł</span> (w tym 23% VAT)</span>
            <span className="plan-form__option-annual-pricing">{(this.state.availablePlans[1].price / 5).toFixed(2)}/rok</span>
            <button className="plan-form__option-btn" onClick={(e) => this.selectPlan(e, 1)}>Wybieram ten!</button>
            </div>
            </fieldset>
            <button className="form-submit-btn" onClick={(e) => this.submitForm(e)}>Przejdź dalej</button>
            </form>
            )
        }
    }