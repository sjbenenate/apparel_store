import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = ({ currentStep }) => {
    const stepOrder = ['cart', 'shipping', 'payment', 'confirmation'];
    const currentIndex = stepOrder.findIndex(
        (item) => item === currentStep.toLowerCase()
    );

    if (currentIndex === -1) {
        throw new Error('Invalid step passed to CheckoutSteps');
    }

    const stepNavItem = (step, route) => {
        const index = stepOrder.findIndex(
            (item) => item === step.toLowerCase()
        );
        const disabled = index > currentIndex;
        return (
            <Nav.Item key={step}>
                <LinkContainer to={route}>
                    <Nav.Link disabled={disabled}>{step}</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        );
    };

    return (
        <Nav className="justify-content-center">
            {[
                stepNavItem('Cart', '/cart'),
                stepNavItem('Shipping', '/shipping'),
                stepNavItem('Payment', '/payment'),
                stepNavItem('Confirmation', '/order'),
            ]}
        </Nav>
    );
};

export default CheckoutSteps;
