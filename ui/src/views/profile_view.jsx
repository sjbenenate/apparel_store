import { useEffect, useState } from 'react';

import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/form_container';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../store/api_orders';
import { ProductRowSmall } from '../components/product_previews';

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
    const orders = ordersQuery.data
        ? ordersQuery.data.toSorted(
              (o1, o2) => new Date(o1.createdAt) > new Date(o2.createdAt) // TODO is not sorting as expected
          )
        : [];

    return (
        <Container>
            <FormContainer>
                <h1>Profile</h1>
                <ListGroup>
                    <UserInfoItem label="Name" value={userInfo?.name} />
                    <UserInfoItem label="Email" value={userInfo?.email} />
                </ListGroup>
                <ListGroup>
                    <h2>Orders</h2>
                    <Col>
                        {orders.length > 0 ? (
                            orders.map((order, index) => {
                                return (
                                    <Row key={index}>
                                        <Col>
                                            <Link to={`/order/${order._id}`}>
                                                {order._id}
                                            </Link>
                                        </Col>
                                        <Col>
                                            <strong>Items: </strong>
                                            {order.orderItems.length}
                                        </Col>
                                        <Col>
                                            <strong>Date: </strong>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </Col>
                                    </Row>
                                );
                            })
                        ) : (
                            <Row>No Orders for this user</Row>
                        )}
                    </Col>
                </ListGroup>
            </FormContainer>
        </Container>
    );
};

export default ProfileView;
