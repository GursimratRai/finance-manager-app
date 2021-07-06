import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import {SideMenu} from './';

import { Layout} from "antd";

const { Content } = Layout;


class Home extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  render() {
    const { isLoggedIn } = this.props.auth;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Layout className="site-layout" style={{ height: "100vh" }}>
        <SideMenu />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
