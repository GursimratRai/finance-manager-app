import React, { Component } from "react";
import { DoughnutChart } from "./";
import { BarChart ,StatChart} from "./";
import { Row, Col } from 'antd';

import '../assets/css/stats.css';

class Stats extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}> <BarChart /></Col>
        </Row>
        <Row style={{marginTop:40}}>
          <Col span={12}><StatChart /></Col>
          <Col span={12}> <DoughnutChart /></Col>
        </Row>
      </div>
    );
  }
}

export default Stats;
