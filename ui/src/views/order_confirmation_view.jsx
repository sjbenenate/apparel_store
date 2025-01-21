import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectPaymentMethod,
    selectCartItems,
    selectCartItemIds,
    selectShippingAddress,
    clearCart,
    selectCartPrices,
} from '../store/cart_slice';
import { Container, Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { RouteButton } from '../components/controls';
import Message from '../components/message';
import CheckoutSteps from '../components/checkout_steps';
import CartSummary from '../components/cart_summary';
import { useCreateOrderMutation } from '../store/api_orders';
import Address from '../components/address';

const OrderConfirmationView = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Store data
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);
    const cartItems = useSelector(selectCartItems);
    const cartItemIds = useSelector(selectCartItemIds);
    const cartPrices = useSelector(selectCartPrices);

    const [createOrder, createOrderStatus] = useCreateOrderMutation();

    // state variables
    const [alertMessage, setAlertMessage] = useState(null);

    const placeOrderHandler = async (e) => {
        if (!shippingAddress?.streetAddress) {
            console.log('No shipping address. Redirect to shipping form.');
            navigate('/shipping');
        }
        if (!paymentMethod) {
            console.log('No payment method. Redirect to payment page.');
            navigate('/payment');
        }

        console.log('placing order');
        try {
            const payload = {
                shippingAddress: { ...shippingAddress },
                orderItems: Object.values(cartItems),
                paymentMethod,
                taxPrice: cartPrices?.tax,
                orderPrice: cartPrices?.itemPrices,
                shippingPrice: cartPrices?.shipping,
                totalPrice: cartPrices?.total,
            };
            const res = await createOrder(payload).unwrap();
            dispatch(clearCart());
            console.log(`routing to /order/${res.orderId}`);
            navigate(`/order/${res.orderId}`);
        } catch (err) {
            const msg = err?.data?.message || err?.error;
            console.warn(msg);
            setAlertMessage(msg);
        }
    };

    const btnSpaceClassName = 'my-2';

    const cartItemsList = () => {
        if (!cartItemIds || cartItemIds.length === 0) return 'No items in cart';
        return (
            <ListGroup>
                {cartItemIds.map((id) => {
                    const item = cartItems[id];
                    return (
                        <ListGroup.Item key={id}>
                            <Row>
                                <Col>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        rounded
                                        fluid
                                    />
                                </Col>
                                <Col>{item.name}</Col>
                                <Col>{`Qty: ${item.qty}`}</Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        );
    };

    return (
        <Container>
            <CheckoutSteps currentStep="confirmation" />
            <h1>Order Confirmation</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush" className="mb-3">
                        <ListGroup.Item>
                            <h2>Items</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>{cartItemsList()}</ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Address {...shippingAddress} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>{paymentMethod}</ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <CartSummary>
                        <Button
                            variant="info"
                            onClick={placeOrderHandler}
                            disabled={createOrderStatus?.isLoading}
                            autoFocus
                        >
                            Place Order
                        </Button>
                    </CartSummary>
                </Col>
            </Row>

            <div className="d-flex flex-wrap justify-content-sm-between">
                <RouteButton
                    to="/payment"
                    text="Back to Payment"
                    className={btnSpaceClassName}
                />

                <Button
                    type="button"
                    variant="info"
                    onClick={placeOrderHandler}
                    className={btnSpaceClassName}
                    disabled={createOrderStatus?.isLoading}
                >
                    Place Order
                </Button>
            </div>
        </Container>
    );
};

export default OrderConfirmationView;
