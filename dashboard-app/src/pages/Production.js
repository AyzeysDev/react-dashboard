import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Production = ({ updateMachineData }) => {
  const [machineInputs, setMachineInputs] = useState({
    machine1: 0,
    machine2: 0,
    machine3: 0,
    machine4: 0,
  });

  const handleInputChange = (e, machine) => {
    setMachineInputs({
      ...machineInputs,
      [machine]: e.target.value,
    });
  };

  const handleSubmit = (e, machine) => {
    e.preventDefault();
    updateMachineData(machine, parseInt(machineInputs[machine], 10));
    setMachineInputs({ ...machineInputs, [machine]: 0 });
  };

  return (
    <Container>
      <h2>Production Input</h2>
      <Row>
        {["machine1", "machine2", "machine3", "machine4"].map((machine, index) => (
          <Col key={machine} md={6} lg={3}>
            <Form onSubmit={(e) => handleSubmit(e, machine)}>
              <h5>{`Machine ${index + 1}`}</h5>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Enter completed count"
                  value={machineInputs[machine]}
                  onChange={(e) => handleInputChange(e, machine)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-2">
                Submit
              </Button>
            </Form>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Production;
