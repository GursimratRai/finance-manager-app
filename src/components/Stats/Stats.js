import React, { useState } from "react";
import { connect } from "react-redux";

//Use ant design component
import { Radio, Button, Row, Col } from "antd";

//Css file for styling
import "../../assets/css/stats.css";

//Action for getting charts data
import { getData } from "../../helpers/utils";
import { BarChart, StatChart, DoughnutChart } from "..";

//Switch 
const options = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const Stats = (props) => {
  let [navigator, setNavigator] = useState(0);
  const [config, SetConfig] = useState({
    type: "month",
    subtype: "days",
    dateFormat: "MMM Do,YY",
  });
  const Data = getData(
    config.type,
    config.subtype,
    navigator,
    config.dateFormat,
    props.transactions
  );

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value === "week") {
      setNavigator(0);
      SetConfig({ type: "week", subtype: "days", dateFormat: "MMM Do,YY" });
    } else if (e.target.value === "month") {
      setNavigator(0);
      SetConfig({ type: "month", subtype: "days", dateFormat: "MMM Do,YY" });
    } else if (e.target.value === "year") {
      setNavigator(0);
      SetConfig({ type: "year", subtype: "month", dateFormat: "MMM ,YY" });
    }
  };

  return (
    <div style={{height:'100vh',background:'white',padding: 10 }}>
      <Row style={{ padding: 5 }}>
        <Col span={1}>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              setNavigator(--navigator);
            }}
            shape="circle"
          >
            <i className="fas fa-angle-left"></i>
          </Button>
          </Col>
          <Col span={1}>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              setNavigator(++navigator);
            }}
            shape="circle"
          >
            <i className="fas fa-angle-right"></i>
          </Button>
        </Col>
        <Col style={{textAlign:'right'}} span={22}>
          <Radio.Group
            options={options}
            onChange={onChange}
            value={config.type}
            optionType="button"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BarChart Data={Data} />
        </Col>
      </Row>
      <Row style={{marginTop:60}}>
        <Col span={10}>
          <StatChart Data={Data} />
        </Col>
        <Col span={14}>
          <DoughnutChart Data={Data} />
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    transactions: state.transaction.transactions,
  };
}

export default connect(mapStateToProps)(Stats);
