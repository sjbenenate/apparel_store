import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = ({ currentStep }) => {
    const stepNavItem = (step, route) => {
        const isCurrent = step.toLowerCase() === currentStep;
        return (
            <Nav.Item key={step} className={isCurrent ? 'text-uppercase' : ''}>
                <LinkContainer to={route}>
                    <Nav.Link disabled={isCurrent}>{step}</Nav.Link>
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
