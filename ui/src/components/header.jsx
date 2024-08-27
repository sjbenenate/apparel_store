import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';

export const Header = () => {
  return (
    <Navbar expand="md" data-bs-theme="dark" bg="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Apparel Outlet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
              <GiShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href="/login">
              <CiUser /> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
