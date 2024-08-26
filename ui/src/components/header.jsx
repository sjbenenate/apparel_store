import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';

export const Header = () => {
  return (
    <Navbar expand="md" variant="light" bg="blue">
      <Container>
        <Navbar.Brand href="/">Apparel Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="header-navbar-nav">
          <Nav>
            <Nav.Item href="/cart">
              {'Cart '}
              <GiShoppingCart />
            </Nav.Item>
            <Nav.Item href="/user">
              {'User '}
              <CiUser />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
