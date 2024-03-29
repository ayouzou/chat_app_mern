import React from 'react'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../services/appApi.js'
import { LinkContainer } from 'react-router-bootstrap';
const Navigation = () => {
  const user = useSelector((state) => state.user)

  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    //redirect to home page 
    window.location.replace('/');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Ark-C</Navbar.Brand>

        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link >Login</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link >Chat</Nav.Link>
            </LinkContainer>

            {user && (
              <NavDropdown title={
                <>
                  <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%' }} />
                  {user.name}
                </>
              } id="basic-nav-dropdown">

                <LinkContainer to="/create-post">
                  <Nav.Link >Create Post</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/chat">
                  <Nav.Link >See AlL Posts</Nav.Link>
                </LinkContainer>
                <NavDropdown.Item href="#action/3.3">About Us</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Contact Us</NavDropdown.Item>
                <NavDropdown.Item >
                  <Button variant='danger' onClick={handleLogout}>Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation