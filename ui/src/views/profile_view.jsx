import { useEffect, useState } from 'react';

import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/form_container';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../store/api_orders';

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

    return (
        <Container>
            <FormContainer>
                <h1>Profile</h1>
                <ListGroup>
                    <UserInfoItem label="Name" value={userInfo?.name} />
                    <UserInfoItem label="Email" value={userInfo?.email} />
                </ListGroup>
                <h2>Orders</h2>
                <ListGroup>
                    {ordersQuery.isSuccess
                        ? ordersQuery.data.map((order) => (
                              <ListGroup.Item>
                                  <Link to={`/order/${order._id}`}>
                                      {order._id} with total items{' '}
                                      {order.orderItems.length}
                                  </Link>
                              </ListGroup.Item>
                          ))
                        : 'no orders found'}
                </ListGroup>
            </FormContainer>
        </Container>
    );
};

export default ProfileView;
