import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {SideMenu,Calender,Stats,Settings} from './';
import { Layout} from "antd";

import '../assets/css/Home.css';

const { Content } = Layout;

class Home extends Component {

  state={
      select:'1'
  }

  handleMenuSelect = (option) => {
      this.setState({
          select:option
      })
  }

  render() {
    const {select} = this.state;
    const { isLoggedIn } = this.props.auth;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
 
    return (
      <Layout className="site-layout" style={{ height: "100vh" }}>
        <SideMenu onMenuSelect={this.handleMenuSelect} />
        <Content
          className="site-layout-background"
          style={{
            height:'100vh',
            minHeight: 280,
          }}
        >
          {select==='1' && <Calender />}
          {select==='2' && <Stats />}
          {select==='3' && <Settings />}
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
