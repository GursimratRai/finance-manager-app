import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {logoutUser} from '../actions/auth';

class Home extends Component {
    logOut = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    }

    render() {
        const {isLoggedIn} = this.props.auth;
        if(!isLoggedIn){
            return <Redirect to='/' />
        }
        return (
            <div>
                Home
                <button onClick={this.logOut}>Log Out</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Home);