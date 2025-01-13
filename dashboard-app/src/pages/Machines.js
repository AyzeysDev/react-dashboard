import React, { useState } from "react";
import GaugeComponent from "react-gauge-component";

const Machines = ({ initialMachineData }) => {
  const [machineData, setMachineData] = useState(initialMachineData);
  const [addInputs, setAddInputs] = useState({});
  const [subtractInputs, setSubtractInputs] = useState({});
  const [totalInputs, setTotalInputs] = useState({});

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

  const updateTotalCount = (machine) => {
    if (totalInputs[machine] !== undefined) {
      setMachineData((prevData) => ({
        ...prevData,
        [machine]: {
          ...prevData[machine],
          totalCount: Math.max(totalInputs[machine], 0),
        },
      }));
      setTotalInputs((prevInputs) => ({ ...prevInputs, [machine]: "" }));
    }
  };

  const updateProgress = (machine, adjustment) => {
    setMachineData((prevData) => ({
      ...prevData,
      [machine]: {
        ...prevData[machine],
        value: Math.max(
          0,
          Math.min(prevData[machine].value + adjustment, prevData[machine].totalCount)
        ),
      },
    }));
  };

  const handleInputChange = (setter, machine, value) => {
    setter((prevInputs) => ({
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
                  value={totalInputs[machine] || ""}
                  min="0"
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) => handleInputChange(setTotalInputs, machine, e.target.value)}
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={() => updateTotalCount(machine)}
                >
                  Order Count
                </button>
              </div>
              {/* Add Progress */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="number"
                  placeholder="Add"
                  value={addInputs[machine] || ""}
                  min="0"
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) => handleInputChange(setAddInputs, machine, e.target.value)}
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
                    setAddInputs((prev) => ({ ...prev, [machine]: "" }));
                  }}
                >
                  Log Production
                </button>
              </div>
              {/* Subtract Progress */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="Remove"
                  value={subtractInputs[machine] || ""}
                  min="0"
                  style={{ padding: "5px", marginRight: "10px", width: "100px" }}
                  onChange={(e) => handleInputChange(setSubtractInputs, machine, e.target.value)}
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
                    updateProgress(machine, -(subtractInputs[machine] || 0));
                    setSubtractInputs((prev) => ({ ...prev, [machine]: "" }));
                  }}
                >
                  Remove Units
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
