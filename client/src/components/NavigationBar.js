import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const TopNavPanel = () => {
  return (
    <div className="TopNavPanel">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav className="me-auto">
                <NavLink activeClassName="active" className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/restaurants"
                >
                  Restaurants
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavPanel;
