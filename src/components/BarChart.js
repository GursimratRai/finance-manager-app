import React, { useState } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getData } from "../helpers/utils";

function getChartData(Data) {
  const data = {
    labels: Data.dates,
    datasets: [
      {
        label: "Income",
        data: Data.incomeData,
        backgroundColor: ["rgba(82, 196, 26, 0.5)"],
        borderColor: ["rgba(77, 177, 27,0.2)"],
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: Data.expenseData,
        backgroundColor: ["rgba(224, 87, 87, 0.7)"],
        borderColor: ["rgba(224, 87, 87, 0.5)"],
        borderWidth: 1,
      },
    ],
  };
  return data;
}

const BarChart = (props) => {
  const Data = getData(props.transactions);
  const chartData = getChartData(Data);
  return (
    <div>
      <Bar width="100vw" height="25vh" data={chartData} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    transactions: state.transaction.transactions,
  };
}

export default connect(mapStateToProps)(BarChart);
