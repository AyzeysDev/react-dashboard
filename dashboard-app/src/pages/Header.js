import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/NavBar.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          {/* Company Name */}
          <Navbar.Brand>
            <i className="fa fa-terminal"></i> Advanced Chain Technologies{" "}
            <i className="fa fa-terminal"></i>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoginPage ? (
                <></> // No additional links on the login page
              ) : (
                <>
                  <Nav.Link as={Link} to="/home">
                    <i className="fa fa-home"></i> Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/machines">
                    <i className="fa fa-cogs"></i> Machines
                  </Nav.Link>
                  <Nav.Link as={Link} to="/production">
                    <i className="fa fa-industry"></i> Production
                  </Nav.Link>
                  <Nav.Link as={Link} to="/clients">
                    <i className="fa fa-users"></i> Clients
                  </Nav.Link>
                  <Nav.Link as={Link} to="/log">
                    <i className="fa fa-clipboard"></i> Log
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    <i className="fa fa-sign-out-alt"></i> Exit
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
