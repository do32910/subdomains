import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class DomainProlong extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            url: "https://api.subdom.name",
            availablePlans: [
                {duration: "Roczny", price: "61.50", durationInInt: 1},
                {duration: "Pięcioletni", price: "246", durationInInt: 5}
            ],
            domainToPurchase: this.props.domainToPurchase,
            userId: this.props.userId,
            expirationDate: this.props.expDate,
            selectedPlan: undefined
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
        let newDate = this.state.expirationDate.split("-");
        newDate[0] = Number(newDate[0]) + Number(this.state.selectedPlan);
        let date = newDate.join("-");
        // console.log("user id", this.state.userId);
        fetch(`${this.state.url}/subdomains/`, {
            method: 'PUT',
            body: JSON.stringify({
                "id_user" : this.state.userId,
                "id_domain" : this.state.domainToPurchase,
                "tag" : "date",
                "new_value" : date
            }),
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },}).then((response) => response.json()).then(res => console.log(res))
            this.setState({
                proceed: true
            }); 
        }
        
        
        render(){
            if(this.state.proceed){
                return(
                    <Redirect to="/dashboard"></Redirect>
                    )
                    
                }
                return (
                    <form className="plan-form">
                    <span className="fieldset-container">
                    <div className="plan-form__option" id="plan-0">
                    <h2 className="plan-form__option-header">{this.state.availablePlans[0].duration}</h2>
                    {/* <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[0].price} zł</span> (w tym 23% VAT)</span>
                <span  className="plan-form__option-annual-pricing">{(this.state.availablePlans[0].price / 1).toFixed(2)}/rok</span> */}
                <button className="plan-form__option-btn" onClick={(e) => this.selectPlan(e, 0)}>Wybieram ten!</button>
                </div>
                <div className="plan-form__option" id="plan-1">
                <h2 className="plan-form__option-header">{this.state.availablePlans[1].duration}</h2>
                {/* <span className="plan-form__option-pricing"><span className="plan-form__option-pricing-price">{this.state.availablePlans[1].price} zł</span> (w tym 23% VAT)</span>
            <span className="plan-form__option-annual-pricing">{(this.state.availablePlans[1].price / 5).toFixed(2)}/rok</span> */}
            <button className="plan-form__option-btn" onClick={(e) => this.selectPlan(e, 1)}>Wybieram ten!</button>
            </div>
            </span>
            <button className="form-submit-btn" onClick={(e) => this.submitForm(e)} disabled={this.state.selectedPlan=== undefined ? true : false}>Przejdź dalej</button>
            </form>
            )
        }
        
    }