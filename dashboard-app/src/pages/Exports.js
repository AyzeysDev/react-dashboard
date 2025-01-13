import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Your Firebase config
import Papa from "papaparse";

const Exports = () => {
  // Export Machine Data
  const handleExportMachines = async () => {
    try {
      const machinesCollection = collection(db, "machinesData");
      const querySnapshot = await getDocs(machinesCollection);

      const machinesData = [];
      querySnapshot.forEach((doc) => {
        machinesData.push({
          machine: doc.id,
          ...doc.data(),
        });
      });

      if (machinesData.length === 0) {
        alert("No machine data available to export.");
        return;
      }

      const csv = Papa.unparse(machinesData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "machines_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting machine data:", error);
      alert("Failed to export machine data.");
    }
  };

  // Export Logs Data
  const handleExportLogs = async () => {
    try {
      const logsCollection = collection(db, "downtimeLog");
      const querySnapshot = await getDocs(logsCollection);

      const logsData = [];
      querySnapshot.forEach((doc) => {
        logsData.push(doc.data()); // Use only the fields, skip the document ID
      });

      if (logsData.length === 0) {
        alert("No downtime logs available to export.");
        return;
      }

      const csv = Papa.unparse(logsData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "downtime_logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting downtime logs:", error);
      alert("Failed to export downtime logs.");
    }
  };

  const handleExportClients = async () => {
    try {
      const clientsCollection = collection(db, "clientsData");
      const querySnapshot = await getDocs(clientsCollection);

      const clientsData = [];
      querySnapshot.forEach((doc) => {
        const { clientName, clientOrderCount, deliveryDate, description, totalPay } = doc.data();
        clientsData.push({
          clientName,
          clientOrderCount,
          deliveryDate,
          description,
          totalPay,
        });
      });

      if (clientsData.length === 0) {
        alert("No client data available to export.");
        return;
      }

      const csv = Papa.unparse(clientsData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "clients_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting client data:", error);
      alert("Failed to export client data.");
    }
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
      {/* Button 2: Export Logs Data */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Button
            variant="info"
            size="lg"
            onClick={handleExportLogs}
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }} // Space between icon and text
          >
            <i className="fa fa-clipboard"></i> Export Downtime Logs
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Exports;
