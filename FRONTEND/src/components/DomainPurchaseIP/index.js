import React, {Component} from 'react';
import './DomainPurchaseIP.css'
import { connect } from "react-redux";
import { bindActionCreators } from  'redux';


class DomainPurchaseIP extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: `https://api.subdom.name`,
            domainToPurchase: this.props.domainToPurchase,
            selectedPlan: this.props.selectedPlan,
            userId: this.props.userId

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
                "id_user" : 3,
                "name" : "mniam",
                "at": "subdom.name",
                "ip_address": "150.254.78.3",
                "purchase_date": "2019-12-12",
                "expiration_date": "2019-12-12"
            })
        }).then(
            (response) => response.json()
        ).then(
            res => console.log(res)
        )
    }

    render(){
        return (
            <div>
                <label>Kupujesz domenę: {this.state.domainToPurchase}</label>
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