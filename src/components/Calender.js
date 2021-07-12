import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar, Badge } from "antd";
import { Transaction } from "./";
import { fetchIncomeList } from "../actions/income";
import { fetchExpenseList } from "../actions/expense";

import moment from "moment";
import "antd/dist/antd.css";
import "../assets/css/Calender.css";

class Calender extends Component {
  state = {
    date: moment().format("DD-MM-YYYY"),
    visible: false,
  };

  onSelect = (value) => {
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

  componentDidMount() {
    this.props.dispatch(fetchIncomeList());
    this.props.dispatch(fetchExpenseList());
  }

  render() {
    const { date, visible } = this.state;
    const { incomes, expenses } = this.props;
    function getListData(value) {
      let listData = [];
      {
        if (incomes.length > 0) {
          let type = "success",
            total = 0;
          {
            incomes.map((item) => {
              if ( moment(item.date).format("DD-MM-YYYY") === value.format("DD-MM-YYYY")) {
                total += item.amount;
                return item;
              }
              return item;
            });
          }
          listData = total > 0 ? [{ type, total }, ...listData] : [...listData];
        }
      }

      {
        if (expenses.length > 0) {
          let type = "error",
            total = 0;
          {
            expenses.map((item) => {
              if ( moment(item.date).format("DD-MM-YYYY") === value.format("DD-MM-YYYY")) {
                total += item.amount;
                return item;
              }
              return item;
            });
          }
          listData = total > 0 ? [{ type, total }, ...listData] : [...listData];
        }
      }
      return listData || [];
    }

    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.length > 0 &&
            listData.map((item, index) => (
              <li key={item.date + index}>
                <Badge status={item.type} text={item.total} />
              </li>
            ))}
        </ul>
      );
    }

    return (
      <div>
        <Calendar onSelect={this.onSelect} dateCellRender={dateCellRender} />
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
    incomes: state.income.incomes,
    expenses: state.expense.expenses,
  };
}

export default connect(mapStateToProps)(Calender);
