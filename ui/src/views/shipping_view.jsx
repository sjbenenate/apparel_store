import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShippingAddress, selectShippingAddress } from '../store/cart_slice';
import FormContainer from '../components/form_container';
import { Form, Button } from 'react-bootstrap';
import { RouteButton } from '../components/controls';
import Message from '../components/message';
import CheckoutSteps from '../components/checkout_steps';
import Metadata from '../components/metadata.jsx';

const verifyAddress = (address) => {
    return Object.values(address).reduce((acc, val) => val.length > 0 && acc);
};

const ShippingView = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Store data
    const shippingAddress = useSelector(selectShippingAddress);

    // state variables
    const [streetAddress, setStreetAddress] = useState(
        shippingAddress?.streetAddress || ''
    );
    const [state, setState] = useState(shippingAddress?.state || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(
        shippingAddress?.postalCode || ''
    );
    const [country, setCountry] = useState(shippingAddress?.country || 'US');
    const [alertMessage, setAlertMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { streetAddress, city, postalCode, country, state };
        if (verifyAddress(payload)) {
            dispatch(setShippingAddress(payload));
            navigate('/payment');
        } else {
            setAlertMessage('An address input field is invalid');
        }
    };

    const submitDisabled = !streetAddress || !city || !postalCode || !country;

    const groupClass = 'my-2';

    return (
        <FormContainer>
            <Metadata title="Checkout - Shipping" description="" />
            <CheckoutSteps currentStep="shipping" />
            <h1>Shipping Address</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="street-address" className={groupClass}>
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                        type="street-address"
                        as="input"
                        placeholder="Street number and name"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city" className={groupClass}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="address-level2"
                        autoComplete="address-level2"
                        as="input"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="address-level1" className={groupClass}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="address-level1"
                        autoComplete="address-level1"
                        as="input"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postal-code" className={groupClass}>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="postal-code"
                        as="input"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country" className={groupClass}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="country country-name"
                        as="input"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="d-flex flex-wrap justify-content-between">
                    <RouteButton to="/cart" text="Back to Cart" />
                    <Button
                        type="submit"
                        variant="info"
                        autoFocus={!submitDisabled}
                        disabled={submitDisabled}
                    >
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default ShippingView;
