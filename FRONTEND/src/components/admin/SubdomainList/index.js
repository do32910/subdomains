import './SubdomainList.css';
import React, {Component} from 'react';
// import '../../GETDomainList/GETDomainList.css';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SubdomainList extends Component{
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
        fetch(`${this.state.url}/admin/`, {
            method: 'post',
            withCredentials: true,
            credentials: 'include',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "id_admin" : 35,
                "tag" : 'subdomains',
                "tag_id" : 'all'
            })
        }).then(resp => resp.json())
        .then(list => {
            console.log(list);
            this.setState({
                domainList: list,
                showList: true
            })
        })
    }
    
    
    changeIP(e, id_domain, id_user){
        e.preventDefault();
        let ipInput = document.querySelector(`#input-${id_domain}`);
        if(ipInput.disabled){
            ipInput.disabled = false;
        }else{
            let newIP = ipInput.value;
            if(!/^([1-2]?[0-9]?[0-9]\.){3}([1-2]?[0-9]?[0-9])$/.test(newIP)){
                // console.log("wrong IP");
                this.setState({
                    shouldMsgBeDisplayed: true
                })
                return 0;
            }
            fetch(`${this.state.url}/subdomains/`, {
                method: 'PUT',
                body: JSON.stringify({
                    "id_user" : id_user,
                    "id_domain" : id_domain,
                    "tag" : "ip",
                    "new_value" : newIP 
                }),
                headers:{
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }}).then(res => res.json())
                .then(response => console.log(response))
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
        // console.log(this.state.domainList[0]);
        return (
            <table className="domain-list">
            <thead className="domain-list__header">
            <tr>
            <td className="td-name">Nazwa domeny</td>
            <td className="td-ip">Adres IP</td>
            <td className="td-owner">Właściciel (Login)</td>
            <td className="td-date">Data wygaśnięcia</td>
            <td className="td-state">Status</td>
            <td></td>
            </tr>
            </thead>
            <tbody className="domain-list__body">
            {
                this.state.domainList.map((element) => {
                    return (
                        <tr key={element.id_domain}>
                        <td className="domain-list-element__name td-name">{element.name}.{element.at}</td>
                        <td className="td-ip"><span className="fieldset-container"><input defaultValue={element.ip_address} className="ipInput" id={`input-${element.id_domain}`} disabled={true} /><button onClick={(e) => this.changeIP(e, element.id_domain, element.id_user)} className="ipInput_button"><FontAwesomeIcon icon="pen" /></button></span></td>
                        <td className="td-owner">{element.first_name} {element.last_name} ({element.login})</td>
                        <td className="td-date">{element.expiration_date}</td>
                        <td className={element.status === "INACTIVE" ? "inactive-domain" : ""}>{element.status === "ACTIVE" ? "Aktywna" : "Nieaktywna"}</td>
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
        
        export default connect(mapStateToProps)(SubdomainList); 