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
import { PAYMENT_METHODS } from '../constants';
import Metadata from '../components/metadata.jsx';

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
        if (!shippingAddress) {
            console.log('No shipping address. Redirect to shipping form.');
            navigate('/shipping');
        }
    }, [shippingAddress]);

    const handleSubmit = (e) => {
        console.log('submit payment');
        e.preventDefault();
        dispatch(setPaymentMethod(inputPayment));
        navigate('/orderConfirmation');
    };

    const paymentSelectOptions = Object.values(PAYMENT_METHODS).map(
        (payMethod) => (
            <Form.Check
                key={payMethod}
                type="radio"
                label={payMethod}
                id={payMethod}
                value={payMethod}
                checked={inputPayment === payMethod}
                onChange={(e) => {
                    setInputPayment(e.target.value);
                }}
            />
        )
    );

    return (
        <FormContainer>
            <Metadata title="Checkout - Payment" description="" />
            <CheckoutSteps currentStep="payment" />
            <h1>Payment</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="payment" className="my-2">
                    <Form.Label>Select a payment method</Form.Label>
                    {paymentSelectOptions}
                </Form.Group>
                <Form.Group className="d-flex flex-wrap justify-content-between">
                    <RouteButton to="/shipping" text="Back to Shipping" />
                    <Button type="submit" variant="info" autoFocus>
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default PaymentView;
