import React, {Component} from 'react';
import './SubdomainList.css';
import Layout from '../../Layout';
import TileTemplate from '../../Layout/TileTemplate';
import { connect } from "react-redux";

class SubdomainList extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: 'https://api.subdom.name',
            loggedUserId: this.props.userId,
            token: this.props.token,
            domainList: [],
            showList: false
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
            this.setState({
                domainList: list,
                showList: true
            })
        })
    }
    
    componentDidMount(){
        this.getList();
    }


//     at: "eu.pl"
// expiration_date: "2016-06-29"
// first_name: "Touya"
// id_domain: 72
// id_user: 3
// ip_address: "3.11.0.33"
// last_name: "Todoroki"
// login: "Dabi"
// name: "test3"
// purchase_date: "2015-06-29"
// status: "INACTIVE"
    
    render(){
        console.log('hey im long ' , this.state.domainList.length);
        console.log(this.state.domainList[0]);
        return(
            <Layout content={<TileTemplate header={"Stas"} content={
                <table className="domain-list">
                <thead className="domain-list__header">
                <tr>
                <td>Nazwa
                    <span>{this.state.domainList[0]}</span></td>
                <td>Status</td>
                <td>Właściciel</td>
                <td>Data wygaśnięcia</td>
                <td>Operacje</td>
                </tr>
                </thead>
                <tbody className="domain-list__body">
                {
                    this.state.domainList.map((element) => {
                        return (
                            <tr key={element.id_domain}>
                            <td className="domain-list-element__name">{element.name}.{element.at}</td>
                            {/* <td><fieldset><input defaultValue={element.ip_address} className="ipInput" id={`input-${element.id_domain}`}/><button className="ipInput_button" onClick={(e) => this.changeIP(e, element.id_domain)}>Z</button></fieldset></td>
                            <td>{element.expiration_date}</td>
                            <td className={element.status === "INACTIVE" ? "inactive-domain" : ""}>{element.status === "ACTIVE" ? "Aktywna" : "Nieaktywna"}</td>
                            <td><button disabled={this.state.shouldProceedBtnBeDisabled} className="domain-list-element__prolong-button" onClick={(e) => this.prolongDomain(e, element.name)}>Przedłuż ważność</button></td> */}
                            </tr>
                            )
                        })
                    }
                    </tbody>
                    </table>
                }/>}/>
                );
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