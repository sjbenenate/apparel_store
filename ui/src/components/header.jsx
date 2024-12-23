import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';
import logo from '../img/peacock_logo.png';
import { useSelector } from 'react-redux';
import { selectCartQty } from '../store/cart_slice';

const CartQtyIcon = () => {
    const cartQty = useSelector(selectCartQty);

    if (!cartQty) return;
    return (
        <Badge pill bg="info" style={{ marginLeft: '5px' }}>
            {cartQty}
        </Badge>
    );
};

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
                                <CartQtyIcon />
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
