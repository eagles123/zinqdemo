import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Toolbar } from "@material-ui/core";

const ProgressChart = props => {
  const { years, closingBalance } = props;
  // console.log(years, closingBalance);
  // useEffect(() => {
  //   console.log(years);
  // }, [years]);
  //console.log(years);

  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    series: [
      {
        name: "STOCK ABC",
        data: [1, 2, 3, 4, 5]
      }
    ],
    xaxis: {
      categories: [1, 2, 3, 4, 5]
    },
    legend: {
      horizontalAlign: "left"
    }
  });

  const [series, setSeries] = useState([
    {
      name: "whever",
      data: [, 2, 3, 4, 5]
    }
  ]);

  useEffect(() => {
    setOptions({ ...options, ["xaxis"]: { categories: years } });
    setSeries([
      {
        name: "whever",
        data: closingBalance
      }
    ]);
  }, [years, closingBalance]);
  console.log(options);

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        height="400"
        width="80%"
      />
    </div>
  );
};

export default ProgressChart;
