import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
    selectCart,
    selectCartPrices,
    createSelectCartItem,
    selectCartItemIds,
} from '../store/cart_slice';

const CartRow = ({ itemId }) => {
    /*const selectItem = useMemo(
        (itemId) => createSelectCartItem(itemId),
        [itemId]
    );
    const cartItem = useSelector(selectItem);*/

    const selectItem = createSelectCartItem(itemId);
    const cartItem = useSelector(selectItem);

    console.log(cartItem);

    return <Row>{itemId}</Row>;
};

const CartView = () => {
    const cartItemIds = useSelector(selectCartItemIds);

    const getCartRows = () => {
        if (cartItemIds.length < 1) return 'No items in cart';
        return cartItemIds.map((id) => <CartRow key={id} itemId={id} />);
    };

    return (
        <div>
            <h1>Cart</h1>
            <Col>{getCartRows()}</Col>
        </div>
    );
};

export default CartView;
