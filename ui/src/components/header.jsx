import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';

export const Header = () => {
  return (
    <Navbar expand="md" variant="dark" bg="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Apparel Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item href="/cart">
              <GiShoppingCart /> Cart
            </Nav.Item>
            <Nav.Item href="/user">
              <CiUser /> Login
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
