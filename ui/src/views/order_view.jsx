import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import {
    useGetOrderQuery,
    useGetPayPalClientIdQuery,
    useCreatePayTransactionMutation,
    useCapturePayTransactionMutation,
    useMarkAsDeliveredQuery,
} from '../store/api_orders';
import Loader from '../components/loader';
import Message from '../components/message';
import { PriceRow } from '../components/cart_summary';
import Address from '../components/address';
import { ProductRowSmall } from '../components/product_previews';
import { localTimeString } from '../utils';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { ACCESS_LEVELS } from '../constants';

export const OrderView = () => {
    const { orderId } = useParams();

    const [alertMessage, setAlertMessage] = useState(null);

    const userInfo = useSelector(selectAuthInfo);

    const {
        data: orderResponse,
        isLoading,
        isError,
        refetch: orderRefetch,
    } = useGetOrderQuery(orderId);

    const deliverQuery = useMarkAsDeliveredQuery(orderId);

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
                        <Message variant="success">
                            Delivered on {localTimeString(order.deliveredAt)}
                        </Message>
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
                        <Message variant="success">
                            Payment received on {localTimeString(order.paidAt)}
                        </Message>
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
        const msg = err?.message || err?.data?.message;
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
    };

    const paypalOnError = async (err) => {
        printError(err);
    };

    const deliveredHandler = async (e) => {
        try {
            const res = await deliverQuery.refetch().unwrap();
            console.log(res);
            orderRefetch();
        } catch (err) {
            printError(err);
        }
    };

    const renderSummaryCard = (order) => {
        if (!order) return <Card>No Order</Card>;
        return (
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Order Summary</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
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
                            <PriceRow label="Total" value={order.totalPrice} />
                        </Col>
                    </ListGroup.Item>
                    {!order?.isPaid ? (
                        <ListGroup.Item display="false">
                            <PayPalButtons
                                createOrder={paypalCreateOrder}
                                onApprove={paypalOnApprove}
                                onError={paypalOnError}
                            />
                        </ListGroup.Item>
                    ) : null}
                    {userInfo.accessLevel >= ACCESS_LEVELS.MAINTAINER ? (
                        <>
                            <ListGroup.Item>
                                <h3>Admin Zone</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    disabled={
                                        order.isDelivered ||
                                        deliverQuery?.isLoading
                                    }
                                    className="btn-block btn-info"
                                    onClick={deliveredHandler}
                                >
                                    Set Delivered
                                </Button>
                            </ListGroup.Item>
                        </>
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
                    <Row>
                        {alertMessage ? (
                            <Message variant="danger">{alertMessage}</Message>
                        ) : null}
                    </Row>
                    <Row>{renderSummaryCard(orderResponse?.order)}</Row>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderView;
