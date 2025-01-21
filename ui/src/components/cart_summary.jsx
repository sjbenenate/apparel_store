import { useSelector } from 'react-redux';
import { Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { selectCartPrices } from '../store/cart_slice';

const PriceRow = ({ label, value }) => (
    <ListGroup.Item className="py-1">
        <Row>
            <Col>{label}</Col>
            <Col>{`$${value}`}</Col>
        </Row>
    </ListGroup.Item>
);

const CartSummary = ({ children }) => {
    const prices = useSelector(selectCartPrices);

    const getPriceRows = () => {
        return (
            <>
                <PriceRow label="Subtotal" value={prices?.itemPrices} />
                <PriceRow
                    label={`Tax (${Math.round(prices?.taxPercentage * 100)}%)`}
                    value={prices?.tax}
                />
                <PriceRow label="Shipping" value={prices?.shipping} />
                <PriceRow label="Total" value={prices?.total} />
            </>
        );
    };

    return (
        <Card className="p-3 m-1">
            <Card.Title className="px-3">{`Summary (${prices.qtyItems} Item${
                prices.qtyItems !== 1 ? 's' : ''
            })`}</Card.Title>
            <ListGroup className="pb-4">
                {prices.qtyItems ? (
                    getPriceRows()
                ) : (
                    <ListGroup.Item>No items in cart</ListGroup.Item>
                )}
            </ListGroup>
            {children}
        </Card>
    );
};

export default CartSummary;
export { PriceRow };
