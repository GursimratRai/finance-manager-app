import React from "react";
import { Column } from '@ant-design/charts';

const BarChart = (props) => {

const config = {
  height:230,
  data: props.Data.BarData,
  isGroup: true,
  xField: 'x',
  yField: 'y',
  seriesField: 'name',
};

  return (
    <div>
      <Column {...config} />
    </div>
  );
};

export default BarChart;
