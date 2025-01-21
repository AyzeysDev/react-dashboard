import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  ListGroup,
  Form,
  Badge,
} from "react-bootstrap";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const DowntimeLog = () => {
  const [machine, setMachine] = useState("");
  const [cause, setCause] = useState("");
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(false); // To toggle form visibility

  const downtimeLogCollection = collection(db, "downtimeLog");

  // Fetch logs from Firestore when the component loads
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const querySnapshot = await getDocs(downtimeLogCollection);
        const logsData = [];
        querySnapshot.forEach((doc) => {
          logsData.push({ id: doc.id, ...doc.data() });
        });
        // Sort logs in descending order of date and time
        logsData.sort(
          (a, b) =>
            new Date(b.date + "T" + b.startTime) - new Date(a.date + "T" + a.startTime)
        );
        setLogs(logsData);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, []);

  const handleLogSubmit = async () => {
    setError("");
    if (machine && cause && date && startTime && endTime) {
      const newLog = {
        machine,
        cause,
        date,
        startTime,
        endTime,
      };

      try {
        // Save to Firestore
        const docRef = await addDoc(downtimeLogCollection, newLog);

        // Update local state with Firestore ID
        setLogs((prevLogs) => [
          { id: docRef.id, ...newLog },
          ...prevLogs, // Prepend to maintain descending order
        ]);
        setMachine("");
        setCause("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setFormVisible(false); // Hide form after successful submission
      } catch (err) {
        setError("Error saving log to database.");
        console.error(err);
      }
    } else {
      setError("Please fill out all fields before submitting.");
    }
  };

  const handleLogDelete = async (logId) => {
    try {
      await deleteDoc(doc(downtimeLogCollection, logId));
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
    } catch (err) {
      console.error("Error deleting log:", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4 text-center">Downtime Log</h2>

          {/* Toggle form button */}
          <Button
            variant={formVisible ? "danger" : "primary"}
            className="mb-3"
            onClick={() => setFormVisible((prev) => !prev)}
          >
            {formVisible ? "Minimize" : "Enter Downtime"}
          </Button>

          {formVisible && (
            <>
              {error && <p className="text-danger">{error}</p>}

              {/* Dropdown for Machines */}
              <div className="mb-3">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                    {machine || "Select Machine"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setMachine("Machine 1")}>
                      Machine 1
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMachine("Machine 2")}>
                      Machine 2
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMachine("Machine 3")}>
                      Machine 3
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMachine("Machine 4")}>
                      Machine 4
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Cause Input */}
              <div className="mb-3">
                <Form.Group>
                  <Form.Label>Cause</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter cause"
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                  />
                </Form.Group>
              </div>

              {/* Date Input */}
              <div className="mb-3">
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </div>

              {/* Start Time Input */}
              <div className="mb-3">
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Form.Group>
              </div>

              {/* End Time Input */}
              <div className="mb-3">
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </div>

              {/* Submit Button */}
              <Button variant="success" onClick={handleLogSubmit}>
                Submit Log
              </Button>
            </>
          )}

          {/* Logs */}
          <div className="mt-4">
            <h3>Logs</h3>
            {logs.length === 0 ? (
              <p>No logs available</p>
            ) : (
              <ListGroup as="ol" numbered>
                {logs.map((log) => (
                  <ListGroup.Item
                    as="li"
                    key={log.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Machine: {log.machine}</div>
                      <strong>Cause:</strong> {log.cause}
                      <br />
                      <strong>Date:</strong> {log.date}
                      <br />
                      <strong>Start Time:</strong> {log.startTime}
                      <br />
                      <strong>End Time:</strong> {log.endTime}
                    </div>
                    <Badge
                      bg="danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLogDelete(log.id)}
                    >
                      -
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DowntimeLog;
