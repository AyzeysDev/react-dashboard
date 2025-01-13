import React, { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import { db } from "../firebase/firebase"; // Your Firebase configuration
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const Machines = () => {
  const [machineData, setMachineData] = useState({});
  const [addInputs, setAddInputs] = useState({});
  const [subtractInputs, setSubtractInputs] = useState({});
  const [totalInputs, setTotalInputs] = useState({});
  const [loading, setLoading] = useState(true);

  const machinesCollection = collection(db, "machinesData");

  const getSubArcs = (totalCount) => [
    { limit: totalCount * 0.25, color: "#EA4228", showTick: true },
    { limit: totalCount * 0.5, color: "#F58B19", showTick: true },
    { limit: totalCount * 0.75, color: "#F5CD19", showTick: true },
    { limit: totalCount, color: "#5BE12C", showTick: true },
  ];

  // Fetch initial data from Firebase
  useEffect(() => {
    const fetchMachineData = async () => {
      const querySnapshot = await getDocs(machinesCollection);
      const data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      setMachineData(data);
      setLoading(false);
    };
    fetchMachineData();
  }, []);

  const updateFirestore = async (machine, updatedData) => {
    try {
      const machineDoc = doc(machinesCollection, machine);
      await setDoc(machineDoc, updatedData);
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  const updateTotalCount = (machine) => {
    if (totalInputs[machine] !== undefined) {
      const updatedMachine = {
        ...machineData[machine],
        totalCount: Math.max(totalInputs[machine], 0),
      };
      setMachineData((prevData) => ({ ...prevData, [machine]: updatedMachine }));
      updateFirestore(machine, updatedMachine);
      setTotalInputs((prevInputs) => ({ ...prevInputs, [machine]: "" }));
    }
  };

  const updateProgress = (machine, adjustment) => {
    const updatedMachine = {
      ...machineData[machine],
      value: Math.max(
        0,
        Math.min(machineData[machine].value + adjustment, machineData[machine].totalCount)
      ),
    };
    setMachineData((prevData) => ({ ...prevData, [machine]: updatedMachine }));
    updateFirestore(machine, updatedMachine);
  };

  const handleInputChange = (setter, machine, value) => {
    setter((prevInputs) => ({
      ...prevInputs,
      [machine]: parseInt(value) || 0,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        {Object.keys(machineData).map((machine, index) => (
          <div key={machine} style={{ textAlign: "center", margin: "20px" }}>
            <h4>Machine {index + 1}</h4>
            <GaugeComponent
              value={machineData[machine].value}
              minValue={0}
              maxValue={machineData[machine].totalCount}
              arc={{
                subArcs: getSubArcs(machineData[machine].totalCount),
              }}
              width={300}
              height={300}
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
