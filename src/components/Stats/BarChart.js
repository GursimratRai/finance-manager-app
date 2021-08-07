import React from "react";

//Use bar chart of ant design charts
import { Column } from '@ant-design/charts';

const BarChart = (props) => {

  //configuration for the bar chart
const config = {
  height:230,
  data: props.Data.BarData,
  isGroup: true,
  xField: 'x',
  yField: 'y',
  seriesField: 'name',
  columnStyle: {
    fillOpacity: 0.8,
    strokeOpacity: 0.5,
    shadowColor: 'grey',
    shadowBlur: 5,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer'
  }
};

  return (
    <div>
      <Column {...config} />
    </div>
  );
};

export default BarChart;
