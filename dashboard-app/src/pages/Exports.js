import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const Exports = () => {
  const handleExportMachines = () => {
    console.log("Exporting Machine Data...");
  };

  const handleExportClients = () => {
    console.log("Exporting Client Data...");
  };

  const handleExportLogs = () => {
    console.log("Exporting Log Data...");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Exports</h2>
        </Col>
      </Row>
      {/* Button 1: Export Machine Data */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleExportMachines}
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }} // Space between icon and text
          >
            <i className="fa fa-cogs"></i> Export Machine Data
          </Button>
        </Col>
      </Row>
      {/* Button 2: Export Clients Data */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Button
            variant="success"
            size="lg"
            onClick={handleExportClients}
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }} // Space between icon and text
          >
            <i className="fa fa-users"></i> Export Clients Data
          </Button>
        </Col>
      </Row>
      {/* Button 3: Export Log */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Button
            variant="info"
            size="lg"
            onClick={handleExportLogs}
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }} // Space between icon and text
          >
            <i className="fa fa-clipboard"></i> Export Log
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Exports;
