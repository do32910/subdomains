import React, {Component} from 'react';
import TileTemplate from '../Layout/TileTemplate';
import Layout from '../Layout';
import AccountDetails from '../AccountDetails';
// import { connect } from "react-redux";

export default class AccountDetailsView extends Component{
    render(){
        console.log(this.props.username);
        return (
            <Layout content={<TileTemplate header="Twoje konto" content={<AccountDetails />}/>}/>
        )
    }
}

// function mapStateToProps(state){
//     return {
//       isLoggedIn: state.isLoggedIn,
//       username: state.username,
//       token: state.token,
//       userId: state.userId
//     }
// }

// export default connect(mapStateToProps)(AccountDetailsView); 