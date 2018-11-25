import React, {Component} from 'react';
import './GETDomainList.css';

export default class DomainList extends Component{
    constructor(props){
        super(props);
        this.state= {
            userId: 3,
            domainList: []
        }
    }

    getList(){
        fetch(`https://api.subdom.name/users/${3}/subdomains/`)
            .then(resp => resp.json())
            .then(list => {
                this.setState({
                    domainList: list
                })
            })
    }

    componentDidMount(){
        this.getList();
    }

    render(){
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
                    return (<tr key={element.id_domain}>
                        <td className="domain-list-element__name">{element.name}.{element.at}</td>
                        <td>{element.ip_address}</td>
                        <td>{element.expiration_date}</td>
                        <td className={element.status === "INACTIVE" ? "inactive-domain" : ""}>{element.status === 
                        "ACTIVE" ? "Aktywna" : "Nieaktywna"}</td>
                        <td><button className="domain-list-element__prolong-button">Przedłuż ważność</button></td>
                    </tr>)
                })
                }
                </tbody>
            </table>            
        )
    }
}