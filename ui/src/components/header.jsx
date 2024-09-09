import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';
import logo from '../img/peacock_logo.png';

export const Header = () => {
  return (
    <Navbar expand="md" data-bs-theme="dark" bg="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="60"
              height="60"
              style={{
                backgroundColor: 'white',
                borderRadius: '100px',
                marginRight: '5px',
              }}
              alt="Peacock Apparel Outlet Logo"
            />
            Peacock Apparel Outlet
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <GiShoppingCart /> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <CiUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
