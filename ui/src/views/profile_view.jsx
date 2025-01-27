import { useEffect, useState } from 'react';

import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap';
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
    const orders = ordersQuery.data
        ? ordersQuery.data.toSorted(
              (o1, o2) => new Date(o1.createdAt) > new Date(o2.createdAt) // TODO is not sorting as expected
          )
        : [];

    const ordersTable = () => {
        return (
            <Table>
                <thead>
                    <tr>
                        <td>Order ID</td>
                        <td>Items</td>
                        <td>Paid</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        {order._id}
                                    </Link>
                                </td>
                                <td>
                                    <strong>Items: </strong>
                                    {order.orderItems.length}
                                </td>
                                <td
                                    style={{
                                        background: order.isPaid
                                            ? 'green'
                                            : 'red',
                                    }}
                                >
                                    {order.isPaid ? 'Yes' : 'No'}
                                </td>
                                <td>
                                    <strong>Date: </strong>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

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
                    <div>
                        {orders.length > 0
                            ? ordersTable()
                            : 'No orders for this user.'}
                    </div>
                </ListGroup>
            </FormContainer>
        </Container>
    );
};

export default ProfileView;
