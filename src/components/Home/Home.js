import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//use ant design component
import { Layout} from "antd";

//Components
import { SideMenu, Calendar, Stats } from "../";

//Css file for styling
import "../../assets/css/Home.css";

const { Content } = Layout;

class Home extends Component {
  state = {
    select: "1",
  };

  //function for handling selection of an option from side menu
  handleMenuSelect = (option) => {
    this.setState({
      select: option,
    });
  };

  render() {
    const { select } = this.state;
    const { isLoggedIn } = this.props.auth;

    //If user is not logged in redirect to login page
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
          </Content>
        </Layout>
      </Layout>
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
export default connect(mapStateToProps)(Home);
