import React, { Component } from 'react';

import {Menu,Layout } from "antd";

const { Sider } = Layout;

class SideMenu extends Component {
    
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

    render() {
      const {onMenuSelect} = this.props;
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
            <Menu.Item onClick={()=> onMenuSelect('1')} key="1" icon={<i className="far fa-calendar-alt"></i>}>
              Transtions
            </Menu.Item>
            <Menu.Item onClick={()=> onMenuSelect('2')} key="2" icon={<i className="far fa-chart-bar"></i>}>
              Stats
            </Menu.Item>
            <Menu.Item onClick={()=> onMenuSelect('3')} key="3" icon={<i className="fas fa-cog"></i>}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        );
    }
}

export default SideMenu;