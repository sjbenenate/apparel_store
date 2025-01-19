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
    createSelectCartItem,
    selectCartItemIds,
    setItemQty,
    removeItem,
} from '../store/cart_slice';
import { RouteButton, QtySelect } from '../components/controls.jsx';
import { roundDecimals } from '../utils.js';
import Message from '../components/message.jsx';
import CartSummary from '../components/cart_summary.jsx';

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

const CartView = () => {
    const navigate = useNavigate();
    const cartItemIds = useSelector(selectCartItemIds);

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping', { replace: true });
    };

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
                    <CartSummary
                        actionButtonText="Checkout"
                        actionButtonHandler={checkoutHandler}
                    />
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
