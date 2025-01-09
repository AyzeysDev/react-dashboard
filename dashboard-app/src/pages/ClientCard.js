// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { ListGroup, Button, Card } from "react-bootstrap";

// const ClientCard = ({
//   id,
//   clientName,
//   description,
//   totalPay,
//   clientOrderCount,
//   deliveryDate,
//   handleRemoveClient,
// }) => {
//   const navigate = useNavigate(); // Initialize useNavigate

//   return (
//     <Card
//       className="my-3 p-3 rounded"
//       bg="light"
//       text="dark"
//       border="dark"
//       style={{ width: "20rem" }}
//     >
//       <Card.Body>
//         <Card.Title>
//           <strong>{clientName}</strong>
//         </Card.Title>
//         <ListGroup variant="flush">
//           <ListGroup.Item>Description: {description}</ListGroup.Item>
//           <ListGroup.Item>Total Pay: ${totalPay}</ListGroup.Item>
//           <ListGroup.Item>Order Count: {clientOrderCount}</ListGroup.Item>
//           <ListGroup.Item>Delivery Date: {deliveryDate}</ListGroup.Item>
//         </ListGroup>
//         <Button
//           variant="warning"
//           onClick={() => navigate(`/edit-client/${id}`)} // Redirect to edit page
//           className="mt-2 me-2"
//         >
//           Edit
//         </Button>
//         <Button
//           variant="danger"
//           onClick={() => handleRemoveClient(id)} // Remove client
//           className="mt-2"
//         >
//           Delete
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ClientCard;
