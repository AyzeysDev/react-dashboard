import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../firebase/firebase"; // Firebase config
import "../styles/Clients.css";

const Clients = () => {
  const [client, setClient] = useState({
    clientName: "",
    description: "",
    totalPay: "",
    clientOrderCount: "",
    deliveryDate: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const clientsCollection = collection(db, "clientsData"); // Firestore collection reference

  const { clientName, description, totalPay, clientOrderCount, deliveryDate } = client;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const values = [clientName, description, totalPay, clientOrderCount, deliveryDate];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => field.trim() !== "");

    if (allFieldsFilled) {
      const newClient = {
        clientName,
        description,
        totalPay,
        clientOrderCount,
        deliveryDate,
      };

      try {
        // Save data to Firestore
        await addDoc(clientsCollection, newClient);
        setClient({ clientName: "", description: "", totalPay: "", clientOrderCount: "", deliveryDate: "" }); // Reset form
        navigate("/client-hub"); // Navigate to ClientHub
      } catch (error) {
        console.error("Error adding client: ", error);
        setErrorMsg("Error saving client data. Please try again.");
      }
    } else {
      errorMsg = "Please fill out all fields before submitting.";
    }
    setErrorMsg(errorMsg);
  };

  return (
    <>
      <Container>
        <Button
          variant="outline-info"
          className="mt-3 ms-2 d-inline"
          onClick={() => navigate("/client-hub")}
        >
          Go to Client Hub
        </Button>
        <div style={{ marginTop: "30px" }}></div>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12}>
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="clientName">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="clientName"
                  value={clientName}
                  placeholder="Enter client name"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Enter client description"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="totalPay">
                <Form.Label>Total Pay</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="totalPay"
                  value={totalPay}
                  placeholder="Enter total payment"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="clientOrderCount">
                <Form.Label>Client Order Count</Form.Label>
                <Form.Control
                  className="input-control"
                  type="number"
                  min="0"
                  name="clientOrderCount"
                  value={clientOrderCount}
                  placeholder="Enter client order count"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control
                  className="input-control"
                  type="date"
                  name="deliveryDate"
                  value={deliveryDate}
                  min={new Date().toISOString().split("T")[0]} // Restrict past dates
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 submit-btn">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
