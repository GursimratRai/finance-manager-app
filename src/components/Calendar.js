import React, { Component } from "react";
import { connect } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import moment from "moment";
import { fetchTransactionList } from "../actions/transaction";
import { Badge } from "antd";
import { ShowTransaction } from "./";

import "antd/dist/antd.css";
import "../assets/css/Calender.css";
import "../assets/css/Settings.css";

function renderEventContent(eventInfo) {
  eventInfo.backgroundColor = "transparent";
  eventInfo.borderColor = "transparent";

  return (
    <div style={{ textAlign: "right" }}>
      <Badge
        status={eventInfo.event.extendedProps.type}
        text={eventInfo.event.title}
      />
    </div>
  );
}

class Calendar extends Component {
  state = {
    date: moment(),
    visible: false,
  };

  handleDateClick = (arg) => {
    this.setState({
      date: moment(arg.dateStr),
      visible: true,
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
    const { transactions } = this.props;
    function getTransactionData(value) {
      let list = [];

      transactions.length > 0 &&
        transactions.map((item) => {
          if (
            moment(item.date).format("DD-MM-YYYY") ===
            moment(value).format("DD-MM-YYYY")
          ) {
            list = [...list, item];
            return item;
          }
          return item;
        });

      return list || [];
    }

    function getEventData() {
      let incomeData = {};
      let expenseData = {};
      transactions.map((transaction) => {
        if (transaction.type === "Income") {
          if (!incomeData[moment(transaction.date).format("YYYY-MM-DD")]) {
            incomeData[moment(transaction.date).format("YYYY-MM-DD")] =
              transaction.amount;
          } else {
            let newAmount =
              incomeData[moment(transaction.date).format("YYYY-MM-DD")] +
              transaction.amount;
            incomeData[moment(transaction.date).format("YYYY-MM-DD")] =
              newAmount;
          }
        } else if (transaction.type === "Expense") {
          if (!expenseData[moment(transaction.date).format("YYYY-MM-DD")]) {
            expenseData[moment(transaction.date).format("YYYY-MM-DD")] =
              transaction.amount;
          } else {
            let newAmount =
              expenseData[moment(transaction.date).format("YYYY-MM-DD")] +
              transaction.amount;
            expenseData[moment(transaction.date).format("YYYY-MM-DD")] =
              newAmount;
          }
        }
        return transaction;
      });

      let list = [];

      for (let item of Object.keys(expenseData)) {
        list.push({ type: "error", title: expenseData[item], date: item });
      }

      for (let item of Object.keys(incomeData)) {
        list.push({ type: "success", title: incomeData[item], date: item });
      }

      return list;
    }

    return (
      <div style={{ padding: 10, background: "white" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // width={"95vw"}
          height={"95vh"}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          dateClick={this.handleDateClick}
          eventContent={renderEventContent}
          events={getEventData()}
        />
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
    transactions: state.transaction.transactions,
  };
}

export default connect(mapStateToProps)(Calendar);
