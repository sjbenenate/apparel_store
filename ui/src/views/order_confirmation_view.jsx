import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectPaymentMethod,
    selectCartItems,
    selectCartPrices,
    selectShippingAddress,
    clearCart,
} from '../store/cart_slice';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { RouteButton } from '../components/controls';
import Message from '../components/message';
import CheckoutSteps from '../components/checkout_steps';
import CartSummary from '../components/cart_summary';

const OrderConfirmationView = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Store data
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    // state variables
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        if (!shippingAddress?.streetAddress) {
            console.log('No shipping address. Redirect to shipping form.');
            navigate('/shipping');
        }
        if (!paymentMethod) {
            console.log('No payment method. Redirect to payment page.');
            navigate('/payment');
        }
    }, [shippingAddress, paymentMethod]);

    const placeOrderHandler = (e) => {
        console.log('handle confirmation');
    };

    const btnSpaceClassName = 'my-2';

    return (
        <Container>
            <CheckoutSteps currentStep="confirmation" />
            <h1>Order Confirmation</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Row>
                <Col md={8}>This is 8 column text</Col>

                <Col md={4}>
                    <CartSummary
                        actionButtonText="Place Order"
                        actionButtonHandler={placeOrderHandler}
                    />
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
                    autoFocus
                    onClick={placeOrderHandler}
                    className={btnSpaceClassName}
                >
                    Place Order
                </Button>
            </div>
        </Container>
    );
};

export default OrderConfirmationView;
