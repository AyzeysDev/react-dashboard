import React from "react";
import { Chart } from "react-google-charts";

const Machines = ({ machineData }) => {
  // Prepare data for the chart
  const chartData = [
    ["Machine", "Total Count", "Completed Count"], // Headers for the chart
    ...Object.keys(machineData).map((machine, index) => [
      `Machine ${index + 1}`,
      machineData[machine].totalCount,
      machineData[machine].value, // Completed count is the `value`
    ]),
  ];

  const options = {
    title: "Machine Production Progress",
    hAxis: {
      title: "Machines",
    },
    vAxis: {
      title: "Count",
    },
    isStacked: true, // Optional: Make it a stacked column chart
    chartArea: { width: "80%", height: "70%" },
    colors: ["#1f77b4", "#ff7f0e"], // Blue for Total, Orange for Completed
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
};

export default Machines;
