import React from 'react';
import { getUser } from "../../data/savedUser";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css';

function Header() {
  const user = getUser(); // pego os dados registrados no localStorage.
  
  return (
    <Navbar expand="lg" className="nav-color">
      <Container>
        <Navbar.Brand href="#home">{ user.username }</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-end">
            <Nav.Link href="/contact">Contatos</Nav.Link>
            <Nav.Link href="/about">Sobre</Nav.Link>
            <Nav.Link href="/">Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
