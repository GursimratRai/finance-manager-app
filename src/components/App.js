import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Signup, Home, Page404 } from "./";
import * as jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { connect } from "react-redux";

import 'antd/dist/antd.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
