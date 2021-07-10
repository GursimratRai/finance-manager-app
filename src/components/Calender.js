import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar } from "antd";
import { Transaction } from "./";
import moment from "moment";
import "antd/dist/antd.css";
import "../assets/css/Calender.css";

class Calender extends Component {
  state = {
    date: moment().format("DD-MM-YYYY"),
    visible: false,
  };

  onSelect = (value) => {
    console.log("value", value.format("DD-MM-YYYY"));

    this.setState({
      visible: true,
      date: value,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onSubmit = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { date, visible} = this.state;
    return (
      <div>
        <Calendar onSelect={this.onSelect} />
        {visible && (
          <Transaction
            date={date}
            visible={visible}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    income: state.income,
  };
}

export default connect(mapStateToProps)(Calender);
