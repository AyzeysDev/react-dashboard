import React, { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

const DowntimeLog = () => {
  const [machine, setMachine] = useState("");
  const [cause, setCause] = useState("");
  const [logs, setLogs] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleLogSubmit = () => {
    if (machine && cause && dateTime) {
      const newLog = {
        id: logs.length + 1,
        machine,
        cause,
        dateTime,
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
      setMachine("");
      setCause("");
      setDateTime("");
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4">Downtime Log</h2>

          {/* Dropdown for Machines */}
          <div className="mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
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
            <label htmlFor="cause" className="form-label">
              Cause
            </label>
            <input
              type="text"
              id="cause"
              className="form-control"
              placeholder="Enter cause"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
            />
          </div>

          {/* Date and Time Input */}
          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button variant="primary" onClick={handleLogSubmit}>
            Enter Log
          </Button>

          {/* Logs */}
          <div className="mt-4">
            <h3>Logs</h3>
            {logs.length === 0 ? (
              <p>No logs available</p>
            ) : (
              <ul className="list-group">
                {logs.map((log) => (
                  <li key={log.id} className="list-group-item">
                    <strong>ID:</strong> {log.id} | <strong>Machine:</strong>{" "}
                    {log.machine} | <strong>Cause:</strong> {log.cause} |{" "}
                    <strong>Date/Time:</strong> {log.dateTime}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DowntimeLog;
