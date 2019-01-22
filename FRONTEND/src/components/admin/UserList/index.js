import './UserList.css';
import React, {Component} from 'react';
import { connect } from "react-redux";

class SubdomainList extends Component{
    constructor(props){
        super(props);
        this.state= {
            url: "https://api.subdom.name",
            userId: this.props.userId,
            token: this.props.token,
            userList: []
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
                "tag" : 'users',
                "tag_id" : 'all'
            })
        }).then(resp => resp.json())
        .then(list => {
            console.log(list);
            this.setState({
                userList: list,
                showList: true
            })
        })
    }
    
    componentDidMount(){
        this.getList();
    }
    
    render(){
        return (
            <table className="user-list">
            <thead className="user-list__header">
            <tr>
            <td className="td-username">Imię użytkownika</td>
            <td className="td-login">Login</td>
            <td className="td-email">Adres E-mail</td>
            <td className="td-registration-date">Data rejestracji</td>
            <td className="td-last-login-date">Ostatnie logowanie</td>
            <td></td>
            </tr>
            </thead>
            <tbody className="user-list__body">
            {
                this.state.userList.map((element) => {
                    return (
                        <tr key={element.id}>
                        <td className="td-username">{element.first_name} {element.last_name}</td>
                        <td className="td-login">{element.login}</td>
                        <td className="td-email">{element.email}</td>
                        <td className="td-registration-date">{element.registration_date}</td>
                        <td className="td-last-login-date">{element.last_login_date}</td>
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