import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "./contexts/authContexts";
import Header from "./pages/Header"; // Import Header
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Header always visible */}
        <div>
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<LoginSignup />} />
              <Route path="/home" element={<Home />} />
          {/* Add other routes as needed */}
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
