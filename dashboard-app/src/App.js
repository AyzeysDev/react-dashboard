import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "./contexts/authContexts";
import { ClientProvider } from "./contexts/ClientContext";
import Header from "./pages/Header"; // Import Header
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Clients from "./pages/Clients"; // Client Form page
import ClientHub from "./pages/ClientHub"; // Page to display client cards

function App() {
  const [clients, setClients] = useState([]);

  const handleOnSubmit = (client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Header always visible */}
        <div>
          <Header />
          <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/" element={<LoginSignup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/clients" element={<Clients handleOnSubmit={handleOnSubmit} />} />
              <Route path="/client-hub" element={<ClientHub clients={clients} />} />
            </Routes>
          </Container>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
