import { useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import OrdersHistory from '../components/orders_history';
import { RouteButton } from '../components/controls';

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
                        <OrdersHistory />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileView;
