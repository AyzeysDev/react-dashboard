import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase"; // Firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { Button, Form, Container } from "react-bootstrap";
import "../styles/LoginSignup.css";

const LoginSignup = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Toggle between Login and Create User
  const navigate = useNavigate();

  const usersCollection = collection(db, "usersCollection");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Query Firestore for the user's credentials
      const userQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        // Check if the password matches
        if (userData.password === password) {
          // Set the current user
          const currentUserData = {
            email: userData.email,
            password: userData.password,
            role: userData.role,
          };
          setCurrentUser(currentUserData);
          navigate("/home"); // Navigate to the home screen
        } else {
          throw new Error("Incorrect password. Please try again.");
        }
      } else {
        throw new Error("User not found. Please check your email.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save New User to Firestore with Default Role as "staff"
      const newUser = { email, password, role: "staff" };
      await setDoc(doc(usersCollection, userId), newUser);
      setCurrentUser(newUser);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <h2 className="text-center mb-4"><i className="fa fa-cogs"> Advanced Chain Technologies</i></h2>
        <Form onSubmit={isCreating ? handleCreateUser : handleLogin}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label className="form-label-custom">
  <i className="fa fa-envelope"></i> Email Address
</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label><i className="fa fa-lock"></i> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="error-message">{error}</p>}

          <Button
            type="submit"
            variant={isCreating ? "success" : "info"}
            className="w-100 mt-4"
            disabled={loading}
          >
            {loading
              ? isCreating
                ? "Creating User..."
                : "Logging in..."
              : isCreating
              ? "Create User"
              : "Login"}
          </Button>

          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={() => setIsCreating((prev) => !prev)}
          >
            {isCreating ? "Switch to Login" : "Switch to Create User"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginSignup;
