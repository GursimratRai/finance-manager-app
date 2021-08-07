import React from "react";

//Use ant design component
import { Row, Col } from "antd";
//Use Doughnut chart of ant design charts
import { Pie, measureTextWidth } from "@ant-design/charts";

const DoughnutChart = (props) => {

  //Custom function for rendering text in the middle 
  const renderStatistic = (containerWidth, text, style) => {
    var _measureTextWidth = (0, measureTextWidth)(text, style),
      textWidth = _measureTextWidth.width,
      textHeight = _measureTextWidth.height;
    var R = containerWidth / 2;
    var scale = 1;
    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }
    var textStyleStr = "width:".concat(containerWidth, "px;");
    return '<div style="'
      .concat(textStyleStr, ";font-size:")
      .concat(scale, "em;line-height:")
      .concat(scale < 1 ? 1 : "inherit", ';">')
      .concat(text, "</div>");
  };

  //configuration for the doughnut chart
  const getConfig = (PieData,PieType,PieColor) => {
  return {
    appendPadding: 0,
    data: PieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    textAlign: "center",
    label: {
      type: "inner",
      offset: "-50%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return "".concat((percent * 100).toFixed(0), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    statistic: {
      title: {
        offsetY: -4,
        style: { fontSize: "17px", fontWeight: "600", color: PieColor},
        customHtml: function customHtml(container, view, datum) {
          var _container$getBoundin = container.getBoundingClientRect(),
            width = _container$getBoundin.width,
            height = _container$getBoundin.height;
          var d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          var text = datum ? datum.type : PieType;
          return renderStatistic(d, text, { fontSize: 28 });
        },
      },
      content: {
        offsetY: 4,
        style: { fontSize: "15px", lineHeight: "20px", fontWeight: "400" },
        customHtml: function customHtml(container, view, datum, data) {
          var _container$getBoundin2 = container.getBoundingClientRect(),
            width = _container$getBoundin2.width;
          return renderStatistic(width, "Category", { fontSize: 32 });
        },
      },
    },
    interactions: [
      { type: "element-single-selected" },
      { type: "element-active" },
    ],
  };
  }

  //Configuration for Income Categories 
  const IncomeConfig = getConfig(props.Data.IncomePieData,'Income','blue');
  //Configuration for Expense Categories
  const ExpenseConfig = getConfig(props.Data.ExpensePieData,'Expense','green');

  return (
    <div>
      <Row style={{ padding: 5 }}>
        <Col span={12}>
          <Pie height={200} {...IncomeConfig} />
        </Col>
        <Col span={12}>
          <Pie height={200} {...ExpenseConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default DoughnutChart;