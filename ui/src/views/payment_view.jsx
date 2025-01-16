import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setPaymentMethod,
    selectPaymentMethod,
    selectShippingAddress,
} from '../store/cart_slice';
import FormContainer from '../components/form_container';
import { Form, Button } from 'react-bootstrap';
import { RouteButton } from '../components/controls';
import Message from '../components/message';
import CheckoutSteps from '../components/checkout_steps';

const PaymentView = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Store data
    const shippingAddress = useSelector(selectShippingAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    // state variables
    const [inputPayment, setInputPayment] = useState(paymentMethod);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        if (!shippingAddress || !Object.keys(shippingAddress).length) {
            console.log('No shipping address. Redirect to shipping form.');
            navigate('/shipping');
        }
    }, [shippingAddress]);

    const handleSubmit = (e) => {
        console.log('submit payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps currentStep="payment" />
            <h1>Payment</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="payment" className="my-2">
                    <Form.Label>Select a payment method</Form.Label>
                    <Form.Check
                        type="radio"
                        label="PayPal or Card"
                        id="paypal-or-card"
                        value={inputPayment}
                        onChange={(e) => {
                            console.log('paypal');
                            setInputPayment(e.target.value);
                        }}
                    />
                    <Form.Check
                        type="radio"
                        label="Bit Coin"
                        id="bit-coin"
                        value={inputPayment}
                        onChange={(e) => {
                            console.log('bits');
                            setInputPayment(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="d-flex flex-wrap justify-content-between">
                    <RouteButton to="/shipping" text="Back to Shipping" />
                    <Button type="submit" variant="info">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default PaymentView;
