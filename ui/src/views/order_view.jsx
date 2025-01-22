import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
    useGetOrderQuery,
    useGetPayPalClientIdQuery,
} from '../store/api_orders';
import Loader from '../components/loader';
import Message from '../components/message';
import { PriceRow } from '../components/cart_summary';
import Address from '../components/address';
import { ProductRowSmall } from '../components/product_previews';

export const OrderView = () => {
    const { orderId } = useParams();

    const {
        data: orderResponse,
        isLoading,
        isError,
    } = useGetOrderQuery(orderId);

    const { data: clientIdResponse, isLoading: clientIdLoading } =
        useGetPayPalClientIdQuery();
    const [{ paypalOptions }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        console.log('paypal dispatching');
        if (!clientIdResponse) return;
        paypalDispatch({
            type: 'resetOptions',
            value: {
                clientId: clientIdResponse.clientId,
                currency: 'USD',
                intent: 'capture',
            },
        });
        console.log('papal dispatching done');
    }, [clientIdResponse, paypalOptions]);

    const renderOrderInfo = (order, user) => {
        return (
            <ListGroup>
                <ListGroup.Item>
                    <p>
                        <strong>Created on: </strong>
                        {new Date(order.createdAt).toLocaleDateString()}
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
                    <Address {...order.shippingAddress} />
                    {order.isDelivered ? (
                        <Message variant="success">Delivered</Message>
                    ) : (
                        <Message variant="warning">Not delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPayed ? (
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
                        {order.orderItems.map((p, index) => (
                            <ProductRowSmall
                                key={index}
                                productId={p._id}
                                {...p}
                            />
                        ))}
                    </Col>
                </ListGroup.Item>
            </ListGroup>
        );
    };

    const renderSummaryCard = (order) => {
        return (
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Order Summary</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {order ? (
                            <Col>
                                <PriceRow
                                    label="SubTotal"
                                    value={order.orderPrice}
                                />
                                <PriceRow
                                    label="Tax (15%)"
                                    value={order.taxPrice}
                                />
                                <PriceRow
                                    label="Shipping"
                                    value={order.shippingPrice}
                                />
                                <PriceRow
                                    label="Total"
                                    value={order.totalPrice}
                                />
                            </Col>
                        ) : (
                            'no info to display'
                        )}
                    </ListGroup.Item>
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
                    {isLoading ? <Loader /> : null}
                    {isError ? (
                        <Message variant="danger">
                            Error loading order info
                        </Message>
                    ) : null}
                    {orderResponse
                        ? renderOrderInfo(
                              orderResponse.order,
                              orderResponse.user
                          )
                        : null}
                </Col>
                <Col md="4">{renderSummaryCard(orderResponse?.order)}</Col>
            </Row>
        </Container>
    );
};

export default OrderView;
