import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { getData } from "../helpers/utils";

function getChartData(categoryObject) {
  let category = Array.from(Object.keys(categoryObject));
  let values = Array.from(Object.values(categoryObject));

  const data = {
    labels: category,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
        ],
        borderWidth: 1,
        hoverOffset: 30,
      },
    ],
  };
  return data;
}

const options1 = {

  cutoutPercentage:75,
  responsive: true,
  legend: {
    display: false,
    position: "left",
    labels: {
      fontSize: 12,
      fontColor: "#6D7278",
      fontFamily: "kanit light"
    }
  }
};

function DoughnutChart(props) {
  const Data = getData(props.type,props.xtype,props.dateFormat,props.transactions);
  const incomeData = getChartData(Data.incomePerCatogories);
  const expenseData = getChartData(Data.expensePerCatogories);

  return (
    <div>
      <Row>
        <Col span={12}>
            <div className='category-text' ><span>Income</span><br></br><span>Category</span></div>
          <Doughnut data={incomeData} width={200} options={options1} />
        </Col>
        <Col span={12}>
        <div className='category-text' ><span>Expense</span><br></br><span>Category</span></div>
        <Doughnut data={expenseData} width={200} options={options1} />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    transactions: state.transaction.transactions,
  };
}

export default connect(mapStateToProps)(DoughnutChart);
