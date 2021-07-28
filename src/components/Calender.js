import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar, Badge } from "antd";
import { ShowTransaction } from "./";
import moment from "moment";
import { fetchTransactionList } from "../actions/transaction";

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
    this.props.dispatch(fetchTransactionList());
  }

  render() {
    const { date, visible } = this.state;
    const { transactions} = this.props;
    function getTransactionData(value) {
      let list = [];

      transactions.length > 0 &&
        transactions.map((item) => {
          if (
            moment(item.date).format("DD-MM-YYYY") ===
            value.format("DD-MM-YYYY")
          ) {

            list = [...list,item];
            return item;
          }
          return item;
        });

      return list || [];
    }

    function getListData(value) {
      let listData = [];
      let totalIncome = 0;
      let totalExpense = 0;

      transactions.length > 0 &&
        transactions.map((item) => {
          if (
            moment(item.date).format("DD-MM-YYYY") ===
            value.format("DD-MM-YYYY")
          ) {
            if(item.type==='Income'){
              totalIncome += item.amount;
            }
            else{
              totalExpense += item.amount;
            }
            return item;
          }
          return item;
        });
      listData = totalIncome > 0 ? [{ type:'success', total:totalIncome }, ...listData] : [...listData];
      listData = totalExpense > 0 ? [{ type:'error', total:totalExpense }, ...listData] : [...listData];
      return listData || [];
    }

    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.length > 0 &&
            listData.map(item => (
              <li key={item._id}>
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
          <ShowTransaction
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            visible={visible}
            date={date}
            list={getTransactionData(date)}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transactions:state.transaction.transactions
  };
}

export default connect(mapStateToProps)(Calender);
