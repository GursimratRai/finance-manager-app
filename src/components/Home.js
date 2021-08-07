import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SideMenu, Calendar, Stats } from "./";
import { Layout} from "antd";

import "../assets/css/Home.css";

const { Content } = Layout;

class Home extends Component {
  state = {
    select: "1",
  };

  handleMenuSelect = (option) => {
    this.setState({
      select: option,
    });
  };

  render() {
    const { select } = this.state;
    const { isLoggedIn } = this.props.auth;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Layout>
        <Layout className="site-layout" style={{ height: "100vh" }}>
          <SideMenu onMenuSelect={this.handleMenuSelect} />
          <Content className="site-layout-background">
            {select === "1" && <Calendar />}
            {select === "2" && <Stats />}
            {/* {select === "3" && <Settings />} */}
          </Content>
        </Layout>
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
