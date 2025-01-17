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
import FormContainer from '../components/form_container';
import { Form, Button } from 'react-bootstrap';
import { RouteButton } from '../components/controls';
import Message from '../components/message';
import CheckoutSteps from '../components/checkout_steps';

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

    const handleSubmit = (e) => {
        console.log('handle confirmation');
    };

    return (
        <FormContainer>
            <CheckoutSteps currentStep="confirmation" />
            <h1>Order Confirmation</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="d-flex flex-wrap justify-content-between">
                    <RouteButton to="/payment" text="Back to Payment" />
                    <Button type="submit" variant="info" autoFocus>
                        Place Order
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default OrderConfirmationView;
