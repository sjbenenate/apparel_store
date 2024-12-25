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
                <Col md={2}>{`$${product.price}`}</Col>
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
                <Col>
                    <Button onClick={removeFromCart}>
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
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
                <Col>{cartList ? cartList : 'No items in cart'}</Col>
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
