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
  const [isSaving, setIsSaving] = useState(false); // Track save operation status

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

  const saveProgressToDatabase = async () => {
    setIsSaving(true);
    try {
      for (const machine in machineData) {
        const machineDoc = doc(machinesCollection, machine);
        await setDoc(machineDoc, machineData[machine]);
      }
      // alert("Progress saved successfully!");
    } catch (error) {
      console.error("Error saving progress:", error);
      alert("Failed to save progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateTotalCount = (machine) => {
    if (totalInputs[machine] !== undefined && totalInputs[machine] > 0) {
      setMachineData((prevData) => ({
        ...prevData,
        [machine]: {
          ...prevData[machine],
          totalCount: totalInputs[machine],
        },
      }));
      setTotalInputs((prevInputs) => ({ ...prevInputs, [machine]: "" }));
    } else {
      alert("Please enter a valid total count greater than 0.");
    }
  };

  const updateProgress = (machine, adjustment) => {
    setMachineData((prevData) => ({
      ...prevData,
      [machine]: {
        ...prevData[machine],
        value: Math.max(
          0,
          Math.min(
            prevData[machine].value + adjustment,
            prevData[machine].totalCount
          )
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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Save Progress Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{
            backgroundColor: "transparent", // Transparent background for outline effect
            color: 'green', // Green text color
            border: "2px solid green", // Green border
            padding: "10px 20px", // Padding for the button
            borderRadius: "5px", // Rounded corners
            cursor: "pointer", // Pointer cursor for interactivity
            fontSize: "16px", // Font size
            transition: "all 0.3s ease", // Smooth hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#31ad47"; // Hover background
            e.target.style.color = "white"; // Hover text color
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent"; // Revert background
            e.target.style.color = "#31ad47"; // Revert text color
          }}
          onClick={saveProgressToDatabase}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Progress"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(machineData).map((machine, index) => (
          <div
            key={machine}
            style={{
              textAlign: "center",
              margin: "20px",
              width: "300px",
            }}
          >
            <h4>Machine {index + 1}</h4>
            <GaugeComponent
              value={machineData[machine].value}
              minValue={0}
              maxValue={machineData[machine].totalCount}
              arc={{
                subArcs: getSubArcs(machineData[machine].totalCount),
              }}
              width={300} // Increased width
              height={150} // Adjusted height
              labels={{
                valueLabel: {
                  format: (value) =>
                    `${value}/${machineData[machine].totalCount}`,
                  fontSize: "16px",
                  color: "#333",
                },
              }}
            />
            <div style={{ marginTop: "15px" }}>
              {/* Total Count Update */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="number"
                  placeholder="Total"
                  value={totalInputs[machine] || ""}
                  min="1"
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    width: "80px",
                  }}
                  onChange={(e) =>
                    handleInputChange(setTotalInputs, machine, e.target.value)
                  }
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "5px",
                    cursor:
                      totalInputs[machine] > 0 ? "pointer" : "not-allowed",
                    opacity: totalInputs[machine] > 0 ? "1" : "0.5",
                  }}
                  onClick={() => updateTotalCount(machine)}
                  disabled={!(totalInputs[machine] > 0)} // Disable if totalInputs is invalid
                >
                  Order Count
                </button>
              </div>

              {/* Add Progress */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="number"
                  placeholder="Add"
                  value={addInputs[machine] || ""}
                  min="0"
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    width: "80px",
                  }}
                  onChange={(e) =>
                    handleInputChange(setAddInputs, machine, e.target.value)
                  }
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
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
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    width: "80px",
                  }}
                  onChange={(e) =>
                    handleInputChange(
                      setSubtractInputs,
                      machine,
                      e.target.value
                    )
                  }
                />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
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
