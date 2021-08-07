import React from "react";

//Use ant design component
import { Row, Col, Statistic } from "antd";

//Statistic for total earning , total spending and savings
const StatChart = (props) => {
  const Data = props.Data;
  return (
    <div>
      <Row>
        <Col span={10} className='statistic earning'>
          <Statistic
            title="Total Earning"
            value={Data.totalIncome}
            precision={2}
            valueStyle={{ color: "#fff" }}
          />
        </Col>
        <Col span={10} className='statistic spending'>
          <Statistic
            title="Total Spending"
            value={Data.totalExpense}
            precision={2}
            valueStyle={{ color: "#fff" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10} className='statistic saving'>
          <Statistic
            title="Savings"
            value={Data.totalIncome - Data.totalExpense}
            precision={2}
            valueStyle={{ color: "#fff" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default StatChart;
