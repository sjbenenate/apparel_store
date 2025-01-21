import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useGetOrderQuery } from '../store/api_orders';

export const OrderView = () => {
    const { orderId } = useParams();

    const orderQuery = useGetOrderQuery(orderId);

    return (
        <Container className="my-3 p-3">
            <Row>
                <h1>{`Order ${orderId}`}</h1>
            </Row>
        </Container>
    );
};

export default OrderView;
