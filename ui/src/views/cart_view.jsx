import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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

    console.log(product);

    return (
        <ListGroup.Item variant="flush">
            <Col md={2}>
                <Image
                    src={product.image}
                    alt={product.name}
                    thumbnail
                    rounded
                    fluid
                />
            </Col>
            <Col md={2}>
                <Link to={`/product/${itemId}`}>{product.name}</Link>
            </Col>
            <Col md={2}>{product.price}</Col>
            <Col md={2}>
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
        </ListGroup.Item>
    );
};

const CartView = () => {
    const cartItemIds = useSelector(selectCartItemIds);

    const getCartRows = () => {
        return cartItemIds.map((id) => <CartRow key={id} itemId={id} />);
    };

    return (
        <div>
            <Row>
                <h1>Shopping Cart</h1>
                <Row>
                    <Col md={6}>
                        {cartItemIds.length < 1 ? (
                            'No items in cart'
                        ) : (
                            <ListGroup>{getCartRows()}</ListGroup>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <RouteButton text="Continue Shopping" />
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default CartView;
