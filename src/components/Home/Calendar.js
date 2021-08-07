import React, { Component } from "react";
import { connect } from "react-redux";

//Use Full Calendar component of react
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

//Use MomentJs for date and time
import moment from "moment";

//Action for fetching the transaction list from the database
import { fetchTransactionList } from "../../actions/transaction";

//Use ant design compoent
import { Badge } from "antd";
import { ShowTransaction } from "..";

//Css file for styling
import "../../assets/css/Calender.css";

//Customizing Date Cell of the calendar and adding data in the cell
function CustomDateCell(eventInfo) {
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

  //Fetch all the transaction list / data from the database
  componentDidMount() {
    this.props.dispatch(fetchTransactionList());
  }

  //function for handling Click on the date cell of the calendar
  handleDateClick = (arg) => {
    this.setState({
      date: moment(arg.dateStr),
      visible: true,
    });
  };

  //function for handling cancellation action.
  //close the modal
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  //function for handling submission action
  onSubmit = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { date, visible } = this.state;
    const { transactions } = this.props;

    //function for getting all the transactions for a particular date
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

    //function for calculating total sum of income/expense transactions w.r.t date
    function getDateCellData() {

      let incomeData = {}; // { date:amount }
      let expenseData = {}; // { date:amount }

      transactions.map((transaction) => {
        let type = transaction.type;
        let date = moment(transaction.date).format("YYYY-MM-DD");
        let amount = transaction.amount;

        if (type === "Income") {
          if (!incomeData[date]) {
            //if date is not found in incomeData
            incomeData[date] = amount;
          } else {
            //if date found in incomeData
            incomeData[date] = incomeData[date] + amount;
          }
        } else if (type === "Expense") {
          if (!expenseData[date]) {
            //if date is not found in expenseData
            expenseData[date] = amount;
          } else {
            //if date is found in expenseData
            expenseData[date] = expenseData[date] + amount;
          }
        }
        return transaction;
      });

      let list = [];

      //format the income data and add to list
      for (let item of Object.keys(expenseData)) {
        list.push({ type: "error", title: expenseData[item], date: item });
      }

      //formatting the expense data and add to list.
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
          height={"95vh"}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          dateClick={this.handleDateClick}
          eventContent={CustomDateCell}
          events={getDateCellData()}
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

//function for mapping the state to props which can then pass as an argument to the component
function mapStateToProps(state) {
  return {
    transactions: state.transaction.transactions,
  };
}

//connecting component to redux store
export default connect(mapStateToProps)(Calendar);
