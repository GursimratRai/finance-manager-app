import React, { Component } from 'react';

import {Menu,Layout } from "antd";

const { Sider } = Layout;

class SideMenu extends Component {
    
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

    render() {
        return (
        <Sider
          theme="light"
          className="sider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div style={{ paddingLeft: "30px" }} onClick={this.toggle}>
            <i className="fas fa-bars"></i>
          </div>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<i className="far fa-calendar-alt"></i>}>
              calender
            </Menu.Item>
            <Menu.Item key="2" icon={<i className="fas fa-chart-pie"></i>}>
              graph
            </Menu.Item>
            <Menu.Item key="3" icon={<i className="fas fa-user"></i>}>
              user
            </Menu.Item>
          </Menu>
        </Sider>
        );
    }
}

export default SideMenu;