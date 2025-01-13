import React from "react";
import GaugeComponent from "react-gauge-component";

const Machines = ({ machineData }) => {
  const getSubArcs = (totalCount) => [
    {
      limit: totalCount * 0.2,
      color: "#EA4228",
      showTick: true,
    },
    {
      limit: totalCount * 0.4,
      color: "#F58B19",
      showTick: true,
    },
    {
      limit: totalCount * 0.6,
      color: "#F5CD19",
      showTick: true,
    },
    {
      limit: totalCount,
      color: "#5BE12C",
      showTick: true,
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
      {Object.keys(machineData).map((machine, index) => (
        <div key={machine} style={{ textAlign: "center", margin: "20px" }}>
          <h3>Machine {index + 1}</h3>
          <GaugeComponent
            value={machineData[machine].value}
            minValue={0} // Set the minimum value for the gauge
            maxValue={machineData[machine].totalCount} // Dynamically set the maximum value based on totalCount
            arc={{
              subArcs: getSubArcs(machineData[machine].totalCount),
            }}
            labels={{
              valueLabel: {
                format: (value) => `${value}/${machineData[machine].totalCount}`,
                fontSize: "16px",
                color: "#333",
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Machines;
