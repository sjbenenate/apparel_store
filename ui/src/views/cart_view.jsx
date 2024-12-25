import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
    ListGroup,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
    selectCartPrices,
    createSelectCartItem,
    selectCartItemIds,
    setItemQty,
} from '../store/cart_slice';
import { RouteButton, QtySelect } from '../components/controls.jsx';
import { FaTrash } from 'react-icons/fa';

const CartRow = ({ itemId }) => {
    /*const selectItem = useMemo(
        (itemId) => createSelectCartItem(itemId),
        [itemId]
    );
    const cartItem = useSelector(selectItem);*/
    const dispatch = useDispatch();
    const selectItem = createSelectCartItem(itemId);
    const product = useSelector(selectItem);
    const [qty, setQty] = useState(product.qty);

    const removeFromCart = (e) => {
        console.log(`Removing item id ${itemId}`);
        dispatch({ type: 'cart/removeItem', payload: { itemId } });
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
                        onChange={(e) => {
                            setQty(e.target.value);
                            dispatch(
                                setItemQty({ ...product, qty: e.target.value })
                            );
                        }}
                    />
                </Col>
                <Col>{`$${product.price * qty}`}</Col>
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

const PriceCard = () => {
    const prices = useSelector(selectCartPrices);

    return (
        <Card className="p-3 m-3">
            <Card.Title>Totals</Card.Title>
            <ListGroup>
                <PriceRow label="Items" value={prices.itemPrices} />
                <PriceRow
                    label={`Tax (${Math.round(prices.taxPercentage * 100)}%)`}
                    value={prices.tax}
                />
                <PriceRow label="Shipping" value={prices.shipping} />
                <PriceRow label="Total" value={prices.total} />
            </ListGroup>
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
            <Row>
                <Col lg={8}>
                    <Row>{cartList ? cartList : 'No items in cart'}</Row>
                </Col>
                <Col lg={4}>
                    <PriceCard />
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
