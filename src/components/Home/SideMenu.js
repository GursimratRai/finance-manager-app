import React, { Component } from "react";
import {connect} from 'react-redux';

//Action for logging user out / sign out
import { logoutUser } from "../../actions/auth";

//components
import { Menu, Layout } from "antd";
const { Sider } = Layout;

class SideMenu extends Component {
  state = {
    collapsed: true,
  };

  //function for toggling side menu
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  //function for logging out the user
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };


  render() {
    const { onMenuSelect } = this.props;
    return (
      <Sider
        theme="light"
        style={{background:'linear-gradient(45deg,#1890ff,#3052cc)',color:'white'}}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="side-menu-logo" onClick={this.toggle}>
        </div>
        <Menu style={{backgroundColor:'transparent',color:'white'}}
 mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => onMenuSelect("1")}
            key="1"
            icon={<i className="far fa-calendar-alt"></i>}
          >
            Transactions
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuSelect("2")}
            key="2"
            icon={<i className="far fa-chart-bar"></i>}
          >
            Stats
          </Menu.Item>
          <Menu.Item
            onClick={this.logOut}
            key="3"
            icon={<i className="fas fa-sign-out-alt"></i>}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

//connect to redux store for using dispatch action
export default connect()(SideMenu);
