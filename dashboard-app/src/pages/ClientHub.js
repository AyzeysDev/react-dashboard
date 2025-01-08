import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const ClientHub = ({ clients }) => {
  return (
    <Container>
      <h2 className="text-center my-4">Client Hub</h2>
      <Row>
        {clients.length > 0 ? (
          clients.map((client) => (
            <Col xs={12} md={6} lg={4} key={client.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{client.clientName}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {client.description}
                    <br />
                    <strong>Total Pay:</strong> ${client.totalPay}
                    <br />
                    <strong>Order Count:</strong> {client.clientOrderCount}
                    <br />
                    <strong>Delivery Date:</strong> {client.deliveryDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No clients added yet. Add clients from the Clients page.</p>
        )}
      </Row>
    </Container>
  );
};

export default ClientHub;
