import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Col, Row, Image, ListGroup } from 'react-bootstrap';
import { Rating } from '../components/rating_widget';
import { useGetProductInfoQuery } from '../store/api_products';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cart_slice.js';
import { RouteButton, QtySelect } from '../components/controls.jsx';
import ReviewForm from '../components/review_form.jsx';
import { localDateString } from '../utils.js';
import Metadata from '../components/metadata.jsx';

const ProductReviewsList = ({ reviews }) => {
    if (!reviews) return null;
    return (
        <ListGroup>
            {reviews.map((review, index) => (
                <ListGroup.Item key={index} className="p-0">
                    <Rating value={review.rating} />
                    <span>
                        <strong>{`${localDateString(review.createdAt)} - ${
                            review.name
                        }`}</strong>
                    </span>
                    <p>{review.comment}</p>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export const ProductView = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const {
        data: product,
        isLoading,
        error: productError,
    } = useGetProductInfoQuery(productId);

    const addToCart = () => {
        console.log(`adding to cart`);
        dispatch(addItemToCart({ ...product, qty: Number(qty) }));
        navigate('/cart');
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
                                msg={`${product.reviews.length} reviews`}
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
                            <QtySelect
                                currentQty={qty}
                                qtyInStock={product.countInStock}
                                onChange={(e) => setQty(e.target.value)}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                variant="info"
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
        <Container className="my-3 p-3">
            <Metadata
                title={product?.name}
                description={product?.description}
            />
            <Row className="mb-3">
                <Col>
                    <RouteButton text="Home" to="/" />
                </Col>
            </Row>
            <Row>
                {productError ? (
                    <Message variant="danger">
                        {productError?.data?.message ||
                            'Error loading product!'}
                    </Message>
                ) : null}
                {isLoading ? <Loader /> : null}
                {product ? productInfo(product) : null}
            </Row>
            <Row className="my-4">
                <Col md="6">
                    <h2>All Reviews</h2>
                    {product?.reviews.length ? (
                        <ProductReviewsList reviews={product.reviews} />
                    ) : (
                        <Message>There are no reviews</Message>
                    )}
                </Col>
                <Col md="6">
                    {product?._id && <ReviewForm productId={product._id} />}
                </Col>
            </Row>
        </Container>
    );
};
