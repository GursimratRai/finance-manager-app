import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//jwt decoder for decoding the authenticating token
import * as jwtDecode from "jwt-decode";

//components
import { Login, Signup, Home, Page404 } from "./";

//actions
import { authenticateUser } from "../actions/auth";

//Css file for styling
import "antd/dist/antd.css";

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

//function for mapping the state to props which can then pass as an argument to the component
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

//connecting component to redux store
export default connect(mapStateToProps)(App);
