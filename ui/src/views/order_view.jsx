import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import {
    useGetOrderQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useCreatePayTransactionMutation,
    useCapturePayTransactionMutation,
} from '../store/api_orders';
import Loader from '../components/loader';
import Message from '../components/message';
import { PriceRow } from '../components/cart_summary';
import Address from '../components/address';
import { ProductRowSmall } from '../components/product_previews';

export const OrderView = () => {
    const { orderId } = useParams();

    const [alertMessage, setAlertMessage] = useState(null);

    const {
        data: orderResponse,
        isLoading,
        isError,
        refetch: orderRefetch,
    } = useGetOrderQuery(orderId);

    const { data: clientIdResponse, isLoading: clientIdLoading } =
        useGetPayPalClientIdQuery();
    const [{ isPending: paypalIsPending }, paypalDispatch] =
        usePayPalScriptReducer();

    const [createPayment, createPaymentStatus] =
        useCreatePayTransactionMutation();
    const [capturePayment, capturePaymentStatus] =
        useCapturePayTransactionMutation();

    useEffect(() => {
        if (!clientIdResponse || !orderResponse || orderResponse?.order?.isPaid)
            return;
        const loadPayPalScript = () => {
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'client-id': clientIdResponse.clientId,
                    currency: 'USD',
                    intent: 'capture',
                },
            });
            paypalDispatch({
                type: 'setLoadingStatus',
                value: 'pending',
            });
        };
        console.log('paypal dispatching');
        loadPayPalScript();
        console.log('papal dispatching done');
    }, [clientIdResponse, orderResponse]);

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
                        <Message variant="danger">Not delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant="success">Payment received!</Message>
                    ) : (
                        <Message variant="danger">
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

    const printError = (err) => {
        const msg = err?.message || err?.error;
        console.error(msg);
        setAlertMessage(msg);
    };

    const paypalCreateOrder = async () => {
        console.log('paypal create order called');
        if (orderResponse.order?.isPaid) {
            throw new Error('This order is already paid');
        }
        try {
            const res = await createPayment({ orderId }).unwrap();
            const id = res.id;
            console.log(`paypal id ${id}`);
            return id;
        } catch (err) {
            printError(err);
        }
    };

    const paypalOnApprove = async (data, actions) => {
        console.log('paypal on approve called');
        try {
            console.log(data);
            const res = await capturePayment({
                orderId,
                paymentId: data.orderID,
            });
            console.log(res);
            orderRefetch();
        } catch (err) {
            printError(err);
        }
        // TODO paypal capture order
    };

    const paypalOnError = async (err) => {
        printError(err);
    };

    const onShippingAddressChange = (data, actions) => {
        console.log(`shipping address change handler`);
        console.log(data);

        // TODO update shipping address for order in database
        // OR handle in backend on capture using address in response
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
                    {order && !order?.isPaid ? (
                        <ListGroup.Item display="false">
                            <PayPalButtons
                                createOrder={paypalCreateOrder}
                                onApprove={paypalOnApprove}
                                onError={paypalOnError}
                                onShippingAddressChange={
                                    onShippingAddressChange
                                }
                            />
                        </ListGroup.Item>
                    ) : null}
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
                <Col md="4">
                    <Row>{renderSummaryCard(orderResponse?.order)}</Row>
                    <Row>
                        {alertMessage ? (
                            <Message variant="danger">{alertMessage}</Message>
                        ) : null}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderView;
