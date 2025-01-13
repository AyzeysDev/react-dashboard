import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContexts";
import Header from "./pages/Header";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import ClientHub from "./pages/ClientHub";
import Machines from "./pages/Machines";
import Production from "./pages/Production";

function App() {
  const [clients, setClients] = useState([]);
  const [machineData] = useState({
    machine1: { value: 0, totalCount: 254 },
    machine2: { value: 70, totalCount: 150 },
    machine3: { value: 120, totalCount: 200 },
    machine4: { value: 200, totalCount: 250 },
  });

  // Handle form submission for clients
  const handleOnSubmit = (client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          {/* Header always visible */}
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/clients" element={<Clients handleOnSubmit={handleOnSubmit} />} />
                <Route path="/client-hub" element={<ClientHub clients={clients} />} />
                <Route
                  path="/machines"
                  element={<Machines machineData={machineData} />}
                />
                <Route path="/production" element={<Production />} />
              </Routes>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
