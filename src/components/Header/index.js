import React from "react";
import { getUser } from "../../data/savedUser";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";

function Header() {
  const user = getUser(); // pego os dados registrados no localStorage.

  return (
    <Navbar expand="lg" className=" nav-color">
      <Container>
        <Navbar.Brand href="#home">
          {" "}
          <h1 className="letter-color">{user.username}</h1>{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: '#fff' }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-end">
            <Nav.Link href="/">
              <h3 className="letter-color me-4">Sair</h3>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
