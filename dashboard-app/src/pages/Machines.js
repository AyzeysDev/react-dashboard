import React, { useState } from "react";
import GaugeComponent from "react-gauge-component";

const Machines = ({ initialMachineData }) => {
  const [machineData, setMachineData] = useState(initialMachineData);
  const [addInputs, setAddInputs] = useState({}); // Track inputs for "Add Progress"
  const [subtractInputs, setSubtractInputs] = useState({}); // Track inputs for "Subtract Progress"

  const getSubArcs = (totalCount) => [
    {
      limit: totalCount * 0.25,
      color: "#EA4228",
      showTick: true,
    },
    {
      limit: totalCount * 0.5,
      color: "#F58B19",
      showTick: true,
    },
    {
      limit: totalCount * 0.75,
      color: "#F5CD19",
      showTick: true,
    },
    {
      limit: totalCount,
      color: "#5BE12C",
      showTick: true,
    },
  ];

  const updateTotalCount = (machine, newTotalCount) => {
    setMachineData((prevData) => ({
      ...prevData,
      [machine]: {
        ...prevData[machine],
        totalCount: Math.max(newTotalCount, 0), // Ensure totalCount is non-negative
      },
    }));
  };

  const updateProgress = (machine, adjustment) => {
    setMachineData((prevData) => ({
      ...prevData,
      [machine]: {
        ...prevData[machine],
        value: Math.max(
          0,
          Math.min(prevData[machine].value + adjustment, prevData[machine].totalCount) // Clamp progress
        ),
      },
    }));
  };

  const handleAddInputChange = (machine, value) => {
    setAddInputs((prevInputs) => ({
      ...prevInputs,
      [machine]: parseInt(value) || 0,
    }));
  };

  const handleSubtractInputChange = (machine, value) => {
    setSubtractInputs((prevInputs) => ({
      ...prevInputs,
      [machine]: parseInt(value) || 0,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        {Object.keys(machineData).map((machine, index) => (
          <div key={machine} style={{ textAlign: "center", margin: "20px" }}>
            <h3>Machine {index + 1}</h3>
            <GaugeComponent
              value={machineData[machine].value}
              minValue={0}
              maxValue={machineData[machine].totalCount}
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
            <div style={{ marginTop: "15px" }}>
              {/* Total Count Update */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="number"
                  placeholder="New Total"
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) =>
                    updateTotalCount(machine, parseInt(e.target.value) || machineData[machine].totalCount)
                  }
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() =>
                    updateTotalCount(
                      machine,
                      parseInt(prompt("Enter new Total Count:")) || machineData[machine].totalCount
                    )
                  }
                >
                  Set Total
                </button>
              </div>
              {/* Add Progress */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="number"
                  placeholder="Add Progress"
                  value={addInputs[machine] || ""}
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) => handleAddInputChange(machine, e.target.value)}
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => {
                    updateProgress(machine, addInputs[machine] || 0);
                    setAddInputs((prev) => ({ ...prev, [machine]: "" })); // Clear input after addition
                  }}
                >
                  Add Progress
                </button>
              </div>
              {/* Subtract Progress */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="Subtract Progress"
                  value={subtractInputs[machine] || ""}
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) => handleSubtractInputChange(machine, e.target.value)}
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => {
                    updateProgress(machine, -(subtractInputs[machine] || 0)); // Subtract progress
                    setSubtractInputs((prev) => ({ ...prev, [machine]: "" })); // Clear input after subtraction
                  }}
                >
                  Subtract Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Machines;
