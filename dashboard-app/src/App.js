import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContexts";
import { db } from "./firebase/firebase"; // Firebase Firestore instance
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Header from "./pages/Header";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import ClientHub from "./pages/ClientHub";
import Machines from "./pages/Machines";
import Production from "./pages/Production";

function App() {
  const [clients, setClients] = useState([]);
  const [machineData, setMachineData] = useState({
    machine1: { value: 0, totalCount: 1 },
    machine2: { value: 0, totalCount: 1 },
    machine3: { value: 0, totalCount: 1 },
    machine4: { value: 0, totalCount: 1 },
  });

  // Load initial data for clients and machines from Firebase
  useEffect(() => {
    const fetchData = async () => {
      // Fetch clients
      const clientsCollection = collection(db, "clients");
      const clientSnapshot = await getDocs(clientsCollection);
      const clientsList = clientSnapshot.docs.map((doc) => doc.data());
      setClients(clientsList);

      // Fetch machine data
      const machinesCollection = collection(db, "machines");
      const machineSnapshot = await getDocs(machinesCollection);
      const machineDataFromDb = {};
      machineSnapshot.docs.forEach((doc) => {
        machineDataFromDb[doc.id] = doc.data();
      });
      setMachineData(machineDataFromDb);
    };

    fetchData();
  }, []);

  // Save updated machine data to Firebase
  const updateMachineDataInDb = async (updatedMachineData) => {
    for (const machine in updatedMachineData) {
      const machineRef = doc(db, "machines", machine);
      await setDoc(machineRef, updatedMachineData[machine]);
    }
    setMachineData(updatedMachineData); // Update local state
  };

  // Handle form submission for clients
  const handleOnSubmit = async (client) => {
    const clientRef = doc(db, "clients", client.id); // Use client.id as the document ID
    await setDoc(clientRef, client); // Save to Firestore
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
                <Route
                  path="/clients"
                  element={<Clients handleOnSubmit={handleOnSubmit} />}
                />
                <Route path="/client-hub" element={<ClientHub clients={clients} />} />
                <Route
                  path="/machines"
                  element={
                    <Machines
                      machineData={machineData}
                      updateMachineData={updateMachineDataInDb}
                    />
                  }
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
