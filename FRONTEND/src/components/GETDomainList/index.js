import React, {Component} from 'react';
import './GETDomainList.css';
import { connect } from "react-redux";
import PlanForm from '../PlanForm';

class GETDomainList extends Component{
    constructor(props){
        super(props);
        this.state= {
            url: "https://api.subdom.name",
            userId: this.props.userId,
            token: this.props.token,
            domainList: [],
            domainToProlong: undefined,
            wrongIPerror: "Błędny format IP",
            shouldMsgBeDisplayed: false,
            shouldProceedBtnBeEnabled: false
        }
    }
    
    getList(){
        fetch(`${this.state.url}/users/${this.state.userId}/subdomains/`, {
            method: 'get',
            withCredentials: true,
            credentials: 'include',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then(resp => resp.json())
            .then(list => {
                this.setState({
                    domainList: list
                })
            })
        }
        
        prolongDomain(e, domain){
            this.setState({
                domainToProlong: domain
            })
        }
        
        changeIP(e, id){
            e.preventDefault();
            let ipInput = document.querySelector(`#input-${id}`);
            if(ipInput.disabled){
                ipInput.disabled = false;
            }else{
                let newIP = ipInput.value;
                if(!/^([1-2]?[0-9]?[0-9]\.){3}([1-2]?[0-9]?[0-9])$/.test(newIP)){
                    console.log("wrong IP");
                    this.setState({
                        shouldMsgBeDisplayed: true
                    })
                    return 0;
                }
                fetch(`${this.state.url}/subdomains/`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "id_user" : this.state.userId,
                        "id_domain" : id,
                        "tag" : "ip",
                        "new_value" : newIP 
                    }),
                    headers:{
                        'Authorization': `Bearer ${this.state.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }})
                    this.setState({
                        shouldProceedBtnBeDisabled: true
                    });  
                    ipInput.disabled = true;
                }
                
            }
            
            componentDidMount(){
                this.getList();
            }
            
            render(){
                if(this.state.domainToProlong){
                    return (
                        <div className="tile-template">
                        <PlanForm domainToPurchase={this.state.domainToProlong} operationType={"prolong"}/>
                        </div>
                        )
                    }
                    return (
                        <table>
                        <thead className="domain-list__header">
                        <tr>
                        <td>Nazwa domeny</td>
                        <td>Adres IP</td>
                        <td>Data wygaśnięcia</td>
                        <td>Status</td>
                        <td></td>
                        </tr>
                        </thead>
                        <tbody className="domain-list__body">
                        {
                            this.state.domainList.map((element) => {
                                return (
                                    <tr key={element.id_domain}>
                                    <td className="domain-list-element__name">{element.name}.{element.at}</td>
                                    <td>
                                    <fieldset>
                                    <input defaultValue={element.ip_address} className="ipInput" id={`input-${element.id_domain}`} disabled={true}/>
                                    <button className="ipInput_button" onClick={(e) => this.changeIP(e, element.id_domain)}>Z</button>
                                    </fieldset>
                                    </td>
                                    <td>{element.expiration_date}</td>
                                    <td className={element.status === "INACTIVE" ? "inactive-domain" : ""}>{element.status === "ACTIVE" ? "Aktywna" : "Nieaktywna"}</td>
                                    <td><button disabled={this.state.shouldProceedBtnBeDisabled} className="domain-list-element__prolong-button" onClick={(e) => this.prolongDomain(e, element.name)}>Przedłuż ważność</button></td>
                                    </tr>
                                    )
                                })
                            }
                            </tbody>
                            </table>            
                            )
                        }
                    }
                    
                    
                    function mapStateToProps(state){
                        return {
                            isLoggedIn: state.isLoggedIn,
                            username: state.username,
                            token: state.token,
                            userId: state.userId
                        }
                    }
                    
                    export default connect(mapStateToProps)(GETDomainList); 