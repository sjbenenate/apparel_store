import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import OrdersHistory from '../components/orders_history';
import { RouteButton } from '../components/controls';
import { useGetUserOrdersQuery } from '../store/api_orders';
import Loader from '../components/loader';
import Message from '../components/message';

const UserInfoItem = ({ label, value }) => {
    return (
        <ListGroup.Item>
            <Row>
                <Col>{`${label}: `}</Col>
                <Col>{value}</Col>
            </Row>
        </ListGroup.Item>
    );
};

const ProfileView = () => {
    const userInfo = useSelector(selectAuthInfo);

    const ordersQuery = useGetUserOrdersQuery();
    const orders = ordersQuery.data ? ordersQuery.data : [];

    return (
        <Container>
            <h1>My Account</h1>
            <Row>
                <Col md={4} className="my-3 px-md-3">
                    <h2>Personal Info</h2>
                    <ListGroup>
                        <UserInfoItem label="Name" value={userInfo?.name} />
                        <UserInfoItem label="Email" value={userInfo?.email} />
                    </ListGroup>
                    <RouteButton to={'/profile/edit'} text="Edit" />
                </Col>
                <Col md={8} className="my-3 px-md-3">
                    <h2>My Orders</h2>
                    <div>
                        <OrdersHistory orders={orders} />
                        {ordersQuery.isLoading ? <Loader /> : null}
                        {ordersQuery.isError ? (
                            <Message variant="danger">
                                Error loading orders
                            </Message>
                        ) : null}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileView;
