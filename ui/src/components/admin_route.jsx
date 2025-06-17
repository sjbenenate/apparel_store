import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { Outlet, Link } from 'react-router-dom';
import { ACCESS_LEVELS } from '../constants';
import { Container, Row, Col } from 'react-bootstrap';

const AdminRoute = ({ accessLevel = ACCESS_LEVELS.ADMIN }) => {
    const userInfo = useSelector(selectAuthInfo);

    if (!userInfo) {
        return (
            <Container>
                <h1>No user logged in</h1>
                <Row>
                    <Col xs="12" sm="2" className="my-3">
                        <Link className="btn btn-info" to="/">
                            Home
                        </Link>
                    </Col>
                    <Col sm="2" className="my-3">
                        <Link className="btn btn-info" to="/login">
                            Login
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
    if (userInfo.accessLevel >= accessLevel) {
        return <Outlet />;
    } else {
        return (
            <Container>
                <h1>Not Authorized</h1>
                <Link className="btn btn-info" to="/">
                    Home
                </Link>
            </Container>
        );
    }
};

export default AdminRoute;
