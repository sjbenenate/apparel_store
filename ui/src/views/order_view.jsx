import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Container,
    Col,
    Row,
    Image,
    ListGroup,
} from 'react-bootstrap';
import { useGetOrderQuery } from '../store/api_orders';
import Loader from '../components/loader';
import Message from '../components/message';
import { PriceRow } from '../components/cart_summary';
import Address from '../components/address';

export const OrderView = () => {
    const { orderId } = useParams();

    const orderQuery = useGetOrderQuery(orderId);
    const isPayed = orderQuery?.data?.isPayed;
    const isDelivered = orderQuery?.data?.isDelivered;

    const renderOrderInfo = () => {
        const user = orderQuery?.data?.user;
        const products = orderQuery?.data?.orderItems || [];
        const shippingAddress = orderQuery?.data?.shippingAddress;

        return (
            <ListGroup>
                <ListGroup.Item>
                    <p>
                        <strong>Created on: </strong>
                        {orderQuery?.data?.createdAt}
                        <br />
                        <strong>Name: </strong>
                        {user?.name}
                        <br />
                        <strong>email: </strong>
                        {user?.email}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Shipping Address</h2>
                    <Address {...shippingAddress} />
                    {isDelivered ? (
                        <Message variant="success">Delivered</Message>
                    ) : (
                        <Message variant="warning">Not delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>{orderQuery?.data?.paymentMethod}</p>
                    {isPayed ? (
                        <Message variant="success">Payment received!</Message>
                    ) : (
                        <Message variant="warning">
                            Requires payment for processing.
                        </Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Products</h2>
                    <Col>
                        {products.map((p, index) => (
                            <Row key={index}>
                                <Col sm="2">
                                    <Image
                                        src={p.image}
                                        alt={p.name}
                                        rounded
                                        fluid
                                    />
                                </Col>
                                <Col>{p.name}</Col>
                                <Col>
                                    ${p.price} x {p.qty} = ${p.price * p.qty}
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </ListGroup.Item>
            </ListGroup>
        );
    };

    const renderSummaryCard = () => {
        return (
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Order Summary</h3>
                    </ListGroup.Item>
                    <PriceRow
                        label="SubTotal"
                        value={orderQuery?.data?.orderPrice}
                    />
                    <PriceRow
                        label="Tax (15%)"
                        value={orderQuery?.data?.taxPrice}
                    />
                    <PriceRow
                        label="Shipping"
                        value={orderQuery?.data?.shippingPrice}
                    />
                    <PriceRow
                        label="Total"
                        value={orderQuery?.data?.totalPrice}
                    />
                </ListGroup>
            </Card>
        );
    };

    return (
        <Container className="my-3 p-3">
            <Row>
                <h1>{`Order ${orderId}`}</h1>
            </Row>
            <Row>
                <Col md="8">
                    {orderQuery.isLoading ? <Loader /> : null}
                    {orderQuery.isError ? (
                        <Message variant="danger">
                            Error loading order info
                        </Message>
                    ) : null}
                    {orderQuery?.data ? renderOrderInfo() : null}
                </Col>
                <Col md="4">{renderSummaryCard()}</Col>
            </Row>
        </Container>
    );
};

export default OrderView;
