import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="#home">
          <img src="https://i.pinimg.com/736x/1a/06/c4/1a06c43c0049c12cf16a37c42a571dbc.jpg" width="200" height="100"
            className="d-inline-block align-top" alt="Movie time logo" />
        </Navbar.Brand>

        <Form inline>
        <Row>
          <Col xs="auto">
          <i class="bi bi-search"></i>
            <Form.Control type="text" placeholder="Search For a Movie" className=" mr-sm-2"/>
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#register">Signup</Nav.Link>
            
            <NavDropdown title="City" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Calicut</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Kochi</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Triruvananthapuram</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
