import React from "react";
import { Row, Col, Statistic } from "antd";

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
            valueStyle={{ color: "#3f8600" }}
          />
        </Col>
        <Col span={10} className='statistic spending'>
          <Statistic
            title="Total Spending"
            value={Data.totalExpense}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10} className='statistic saving'>
          <Statistic
            title="Savings"
            value={Data.totalIncome - Data.totalExpense}
            precision={2}
          />
        </Col>
      </Row>
    </div>
  );
}

export default StatChart;
