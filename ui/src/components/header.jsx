import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { GiShoppingCart } from 'react-icons/gi';
import { CiUser } from 'react-icons/ci';
import logo from '../img/peacock_logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store/cart_slice';
import { selectAuthInfo, clearUserCredentials } from '../store/auth_slice';
import { useLogoutQuery } from '../store/api_users';
import { useNavigate } from 'react-router-dom';
import { ACCESS_LEVELS } from '../constants';

const CartQtyIcon = () => {
    const cartItems = useSelector(selectCartItems);
    const cartQty = Object.values(cartItems).reduce(
        (acc, item) => acc + item.qty,
        0
    );

    if (!cartQty) return;
    return (
        <Badge pill bg="info" style={{ marginLeft: '5px' }}>
            {cartQty}
        </Badge>
    );
};

const UserNav = () => {
    const dispatch = useDispatch();
    const authInfo = useSelector(selectAuthInfo);
    const navigate = useNavigate();
    const logoutQuery = useLogoutQuery();

    const handleLogout = async (e) => {
        console.debug('logging out');
        try {
            const res = await logoutQuery.refetch().unwrap();
            console.info(`${res?.message}`);
            dispatch(clearUserCredentials());
            navigate('/');
        } catch (err) {
            if (err.status !== 409) {
                console.warn(err?.error || err?.data?.message);
                return;
            }
        }

        dispatch(clearUserCredentials());
        navigate('/');
    };

    const loggedInNav = (
        <NavDropdown title={authInfo?.name}>
            <NavDropdown.Item
                onClick={handleLogout}
                disabled={logoutQuery?.isLoading}
            >
                Logout
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/profile')}>
                Profile
            </NavDropdown.Item>
        </NavDropdown>
    );

    const loggedOutNav = (
        <LinkContainer to="/login">
            <Nav.Link>
                <CiUser /> Sign In
            </Nav.Link>
        </LinkContainer>
    );

    return <Nav.Item>{authInfo ? loggedInNav : loggedOutNav}</Nav.Item>;
};

const AdminNav = () => {
    const authInfo = useSelector(selectAuthInfo);

    if (authInfo && authInfo.accessLevel > ACCESS_LEVELS.BASIC) {
        return (
            <Nav.Item>
                <NavDropdown title="Admin Area">
                    <LinkContainer to="/admin/ordersList">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productsList">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/usersList">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Nav.Item>
        );
    } else {
        return null;
    }
};

const Header = () => {
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
                        <AdminNav />
                        <UserNav />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
