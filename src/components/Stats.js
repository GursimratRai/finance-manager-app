import React, { useState } from "react";
import { BarChart, StatChart, DoughnutChart } from "./";
import { Radio, Row, Col } from "antd";

import "../assets/css/stats.css";

const options = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const Stats = (props) => {
  const [value, setValue] = useState("month");
  const [xtype, setXtype] = useState("days");
  const [dateFormat, SetDateFormat] = useState("MMM Do,YY");

  const onChange = (e) => {
      e.preventDefault();
      setValue(e.target.value);
      console.log('value',e.target.value);
      if(e.target.value === "week"){
        setXtype("days");
        SetDateFormat("MMM Do,YY");
      }else if(e.target.value === "month"){
          setXtype("days");
          SetDateFormat("MMM Do,YY");
      }else if(e.target.value === "year"){
          setXtype("month");
          SetDateFormat("MMM,YY");
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Radio.Group
            options={options}
            onChange={onChange}
            value={value}
            optionType="button"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BarChart type={value} xtype={xtype} dateFormat={dateFormat} />
        </Col>
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Col span={12}>
          <StatChart type={value}  xtype={xtype} dateFormat={dateFormat} />
        </Col>
        <Col span={12}>
          <DoughnutChart type={value}  xtype={xtype} dateFormat={dateFormat} />
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
