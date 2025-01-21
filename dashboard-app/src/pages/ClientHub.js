import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Button, Form } from "react-bootstrap";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ClientsHub = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const clientsCollection = collection(db, "clientsData");

  // Fetch clients from Firestore, handle deletion of old dates, and sort by delivery date
  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(clientsCollection);
      const clientsData = [];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Calculate yesterday's date

      querySnapshot.forEach(async (docSnapshot) => {
        const client = { id: docSnapshot.id, ...docSnapshot.data() };
        const deliveryDate = new Date(client.deliveryDate);

        if (deliveryDate < yesterday) {
          // Delete clients with delivery dates before yesterday
          await deleteDoc(doc(db, "clientsData", client.id));
        } else {
          clientsData.push(client);
        }
      });

      // Sort clients by delivery date in ascending order
      clientsData.sort(
        (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate)
      );
      setClients(clientsData);
    };

    fetchClients();
  }, []);

  // Handle save after editing
  const handleSave = async (clientId, updatedClient) => {
    const clientDoc = doc(db, "clientsData", clientId);
    try {
      await updateDoc(clientDoc, updatedClient);
      setClients((prev) =>
        prev.map((client) =>
          client.id === clientId ? { id: clientId, ...updatedClient } : client
        )
      );
      setEditingClient(null); // Close edit mode
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  // Handle delete
  const handleDelete = async (clientId) => {
    const clientDoc = doc(db, "clientsData", clientId);
    try {
      await deleteDoc(clientDoc);
      setClients((prev) => prev.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Clients Hub</h2>
      {clients.length === 0 ? (
        <div className="text-center my-4">
          <h4>No client information available</h4>
          <p>Please add client info to start tracking.</p>
        </div>
      ) : (
        <Row>
          {clients.map((client) => (
            <Col key={client.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-4">
                <Card.Body>
                  {editingClient === client.id ? (
                    <Form>
                      <Form.Group controlId="formClientName" className="mb-3">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={client.clientName}
                          onChange={(e) =>
                            setClients((prev) =>
                              prev.map((item) =>
                                item.id === client.id
                                  ? { ...item, clientName: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={client.description}
                          onChange={(e) =>
                            setClients((prev) =>
                              prev.map((item) =>
                                item.id === client.id
                                  ? { ...item, description: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formTotalPay" className="mb-3">
                        <Form.Label>Total Pay</Form.Label>
                        <Form.Control
                          type="text"
                          value={client.totalPay}
                          onChange={(e) =>
                            setClients((prev) =>
                              prev.map((item) =>
                                item.id === client.id
                                  ? { ...item, totalPay: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formOrderCount" className="mb-3">
                        <Form.Label>Order Count</Form.Label>
                        <Form.Control
                          type="number"
                          value={client.clientOrderCount}
                          onChange={(e) =>
                            setClients((prev) =>
                              prev.map((item) =>
                                item.id === client.id
                                  ? {
                                      ...item,
                                      clientOrderCount: e.target.value,
                                    }
                                  : item
                              )
                            )
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formDeliveryDate" className="mb-3">
                        <Form.Label>Delivery Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={client.deliveryDate}
                          min={new Date().toISOString().split("T")[0]} // Restrict past dates
                          onChange={(e) =>
                            setClients((prev) =>
                              prev.map((item) =>
                                item.id === client.id
                                  ? { ...item, deliveryDate: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleSave(client.id, client)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingClient(null)}
                      >
                        Cancel
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <Card.Title>{client.clientName}</Card.Title>
                      <Card.Text>Description: {client.description}</Card.Text>
                      <Card.Text>Total Pay: {client.totalPay}</Card.Text>
                      <Card.Text>
                        Order Count: {client.clientOrderCount}
                      </Card.Text>
                      <Card.Text>
                        Delivery Date: {client.deliveryDate}
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => setEditingClient(client.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(client.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ClientsHub;
