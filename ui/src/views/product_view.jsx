import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Image, ListGroup } from 'react-bootstrap';
import { Rating } from '../components/rating_widget';
import { useGetProductInfoQuery } from '../store/api_products';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cart_slice.js';
import { RouteButton } from '../components/controls.jsx';

export const ProductView = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductInfoQuery(productId);

    const addToCart = () => {
        console.log(`adding to cart`);
        dispatch(addItemToCart({ ...product, qty: Number(qty) }));
        navigate('/cart');
    };

    const qtySelect = (qtyInStock) => {
        if (!qtyInStock) return;
        return (
            <Form.Select
                value={qty}
                disabled={!qtyInStock}
                onChange={(e) => {
                    console.log(`setting qty to ${e.target.value}`);
                    setQty(e.target.value);
                }}
            >
                {[...Array(qtyInStock).keys()].map((i) => {
                    const v = i + 1;
                    return (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    );
                })}
            </Form.Select>
        );
    };

    const productInfo = (product) => {
        if (!product) {
            return <Row>No Product to display </Row>;
        }
        return (
            <Row>
                <Col md={4}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                msg={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h5>${product.price}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>
                                {product.countInStock
                                    ? 'In Stock'
                                    : 'Not In Stock'}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {qtySelect(product.countInStock)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                variant="success"
                                type="button"
                                disabled={product.countInStock < 1}
                                onClick={addToCart}
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        );
    };

    return (
        <div className="my-3 p-3">
            <RouteButton text="Back" route="/" />
            {isError ? (
                <Message variant="danger">Error loading product!</Message>
            ) : null}
            {isLoading ? <Loader /> : null}
            {product ? productInfo(product) : null}
        </div>
    );
};
