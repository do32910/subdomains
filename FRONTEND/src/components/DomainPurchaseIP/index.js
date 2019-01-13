import React, {Component} from 'react';
import './DomainPurchaseIP.css'
import { connect } from "react-redux";
import { Redirect } from 'react-router';


class DomainPurchaseIP extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: `https://api.subdom.name`,
            domainToPurchase: this.props.domainToPurchase,
            selectedPlan: this.props.selectedPlan,
            userId: this.props.userId,
            proceed: false
            
        }
    }
    
    domainPOST(e){
        e.preventDefault();
        var domainIP = document.getElementById("ipInput").value;
        var currentDate = new Date();
        var purchaseDate = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
        var expirationDate = (currentDate.getFullYear() + this.state.selectedPlan) + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
        
        if(!/^([1-2]?[0-9]?[0-9]\.){3}([1-2]?[0-9]?[0-9])$/.test(domainIP)){
            console.log("wrong IP");
            return 0;
        }
        
        fetch(`${this.state.url}/subdomains/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_user" : this.state.userId,
                "name" : this.state.domainToPurchase,
                "at": "subdom.name",
                "ip_address": domainIP,
                "purchase_date": purchaseDate,
                "expiration_date": expirationDate
            })
        }).then(
            (response) => response.json()
            ).then(
                res => {
                    console.log(res);
                    this.setState({
                        proceed: true
                    })
                }
                )
            }
            
            render(){
                console.log(this.state.proceed);
                if(this.state.proceed){
                    <Redirect to="/domainlist" />
                }
                return (
                    <div id="ip-info-container">
                    <label className="ip-info-label">Kupujesz domenę: {this.state.domainToPurchase}</label>
                    <div className="ipInput-container">
                    <input placeholder="Tutaj wprowadź IP..." id="ipInput" /> 
                    <button onClick={(e) => this.domainPOST(e)}>Zatwierdź IP i kup</button>   
                    </div>
                    </div>
                    )
                }
            }
            
            
            function mapStateToProps(state){
                return {
                    userId: state.userId
                }
            }
            
            export default connect(mapStateToProps)(DomainPurchaseIP); 