import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Company Name */}
        <Navbar.Brand>
          Advanced Chain Technologies
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoginPage ? (
              // No additional links on the login page
              <></>
            ) : (
              // Show navigation links after login
              <>
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/machines">
                  Machines
                </Nav.Link>
                <Nav.Link as={Link} to="/production">
                  Production
                </Nav.Link>
                <Nav.Link as={Link} to="/clients">
                  Clients
                </Nav.Link>
                <Nav.Link as={Link} to="/client-hub">
                  Client Hub
                </Nav.Link>
                <Nav.Link as={Link} to="/log">
                  Log
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="exit-link">
                  Exit
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
