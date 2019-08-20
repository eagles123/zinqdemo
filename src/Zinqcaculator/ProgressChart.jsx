import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ProgressChart = props => {
  const { years, closingBalance, monthlyPayment, loan } = props;

  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ["#673ab7"],
    fill: {
      colors: ["#673ab7"]
    },
    tooltip: {},
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },

    xaxis: {
      categories: []
    },
    yaxis: {
      showAlways: false,
      tickAmount: 10,
      forceNiceScale: true
    },
    legend: {
      horizontalAlign: "left"
    }
  });

  const [series, setSeries] = useState([
    {
      name: "",
      data: []
    }
  ]);
  useEffect(() => {
    setOptions({
      ...options,
      xaxis: { categories: years },
      tooltip: {
        y: {
          name: "",
          formatter: function(value) {
            return `${Math.round(100 - (value / loan) * 100)} % paid off!`;
          }
        }
      }
    });
    setSeries([
      {
        data: closingBalance
      }
    ]);
  }, [years, closingBalance]);

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
