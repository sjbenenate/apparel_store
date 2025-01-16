import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Image,
    ListGroup,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import {
    selectCartPrices,
    createSelectCartItem,
    selectCartItemIds,
    setItemQty,
    removeItem,
} from '../store/cart_slice';
import { RouteButton, QtySelect } from '../components/controls.jsx';
import { roundDecimals } from '../utils.js';
import Message from '../components/message.jsx';

const CartRow = ({ itemId }) => {
    const dispatch = useDispatch();
    const selectItem = createSelectCartItem(itemId);
    const product = useSelector(selectItem);
    const [qty, setQty] = useState(product.qty);

    const addToCart = async (e) => {
        setQty(e.target.value);
        dispatch(setItemQty({ ...product, qty: e.target.value }));
    };

    const removeFromCart = async (e) => {
        console.log(`Removing item id ${itemId}`);
        dispatch(removeItem({ itemId }));
    };

    return (
        <Card className="p-3">
            <Row>
                <Col style={{ maxWidth: '200px' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        rounded
                        fluid
                    />
                </Col>
                <Col md={2}>
                    <Link to={`/product/${itemId}`}>{product.name}</Link>
                </Col>
                <Col>{`$${product.price} each`}</Col>
                <Col sm={3}>
                    <QtySelect
                        currentQty={qty}
                        qtyInStock={product.countInStock}
                        onChange={addToCart}
                    />
                </Col>
                <Col>{`$${roundDecimals(product.price * qty)}`}</Col>
                <Col>
                    <Button
                        type="button"
                        variant="warning"
                        onClick={removeFromCart}
                    >
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

const PriceRow = ({ label, value }) => (
    <ListGroup.Item className="py-1">
        <Row>
            <Col>{label}</Col>
            <Col>{`$${value}`}</Col>
        </Row>
    </ListGroup.Item>
);

const SummaryCard = () => {
    const navigate = useNavigate();
    const prices = useSelector(selectCartPrices);

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping', { replace: true });
    };

    const noItemsBody = (
        <>
            <Card.Title className="px-3">Summary</Card.Title>
            <Card.Text>No items</Card.Text>
        </>
    );

    const withItemsBody = (
        <>
            <Card.Title className="px-3">{`Summary (${prices.qtyItems} Item${
                prices.qtyItems !== 1 ? 's' : ''
            })`}</Card.Title>
            <ListGroup>
                <PriceRow label="Subtotal" value={prices?.itemPrices} />
                <PriceRow
                    label={`Tax (${Math.round(prices?.taxPercentage * 100)}%)`}
                    value={prices?.tax}
                />
                <PriceRow label="Shipping" value={prices?.shipping} />
                <PriceRow label="Total" value={prices?.total} />
            </ListGroup>
            <Button
                variant="info"
                disabled={!prices?.qtyItems}
                onClick={checkoutHandler}
            >
                Checkout
            </Button>
        </>
    );

    return (
        <Card className="p-3 m-1">
            {!prices?.qtyItems ? noItemsBody : withItemsBody}
        </Card>
    );
};

const CartView = () => {
    const cartItemIds = useSelector(selectCartItemIds);

    let cartList = null;
    if (cartItemIds.length > 0) {
        cartList = (
            <ListGroup variant="flush">
                {cartItemIds.map((id) => (
                    <ListGroup.Item key={id}>
                        <CartRow itemId={id} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }

    return (
        <Container>
            <Row>
                <h1>Shopping Cart</h1>
            </Row>
            <Row className="mb-2">
                <Col lg={8}>
                    <Row>
                        {cartList ? (
                            cartList
                        ) : (
                            <Message variant="info">
                                No items in cart. <Link to="/">Find some!</Link>
                            </Message>
                        )}
                    </Row>
                </Col>
                <Col lg={4}>
                    <SummaryCard />
                </Col>
            </Row>
            <Row>
                <Col style={{ width: 'contain' }}>
                    <RouteButton text="Continue Shopping" />
                </Col>
            </Row>
        </Container>
    );
};

export default CartView;
