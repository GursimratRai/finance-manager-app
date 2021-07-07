import React, { Component } from 'react';
import {connect} from 'react-redux';

import { logoutUser } from "../actions/auth";

class Settings extends Component {
    logOut = () => {
        localStorage.removeItem("token");
        this.props.dispatch(logoutUser());
      };
    
    render() {
        return (
            <div>
                <button onClick={this.logOut}>Logout</button>
            </div>
        );
    }
}

export default connect()(Settings);