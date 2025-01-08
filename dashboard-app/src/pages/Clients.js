import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Clients = ({ handleOnSubmit }) => {
  const [client, setClient] = useState({
    clientName: "",
    description: "",
    totalPay: "",
    clientOrderCount: "",
    deliveryDate: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const { clientName, description, totalPay, clientOrderCount, deliveryDate } = client;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "totalPay":
        if (value === "" || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setClient((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case "clientOrderCount":
        if (value === "" || parseInt(value) === +value) {
          setClient((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setClient((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const values = [clientName, description, totalPay, clientOrderCount, deliveryDate];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => field.trim() !== "");

    if (allFieldsFilled) {
      const newClient = {
        id: uuidv4(),
        clientName,
        description,
        totalPay,
        clientOrderCount,
        deliveryDate,
      };
      handleOnSubmit(newClient); // Pass the new client data to the parent component
      setClient({ clientName: "", description: "", totalPay: "", clientOrderCount: "", deliveryDate: "" }); // Reset form
      navigate("/client-hub"); // Navigate to ClientHub after submission
    } else {
      errorMsg = "Please fill out all fields before submitting.";
    }
    setErrorMsg(errorMsg);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          {errorMsg && <p className="error-msg text-danger">{errorMsg}</p>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="clientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
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
                type="number"
                name="clientOrderCount"
                value={clientOrderCount}
                placeholder="Enter client order count"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="deliveryDate">
              <Form.Label>Delivery Date</Form.Label>
              <Form.Control
                type="date"
                name="deliveryDate"
                value={deliveryDate}
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Clients;
