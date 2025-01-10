import React from "react";
import { Chart } from "react-google-charts";

const Machines = ({ machineData }) => {
  // Prepare old and new data for the chart
  const dataOld = [
    ["Machine", "Total Count"],
    ...Object.keys(machineData).map((machine, index) => [
      `Machine ${index + 1}`,
      machineData[machine].totalCount,
    ]),
  ];

  const dataNew = [
    ["Machine", "Completed Count"],
    ...Object.keys(machineData).map((machine, index) => [
      `Machine ${index + 1}`,
      machineData[machine].value,
    ]),
  ];

  const diffdata = {
    old: dataOld,
    new: dataNew,
  };

  const options = {
    title: "Machine Production Progress (Total vs Completed)",
    hAxis: {
      title: "Machines",
    },
    vAxis: {
      title: "Count",
    },
    chartArea: { width: "80%", height: "70%" },
    colors: ["#1f77b4", "#ff7f0e"], // Blue for Total, Orange for Completed
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="600px"
      diffdata={diffdata}
      options={options}
    />
  );
};

export default Machines;
