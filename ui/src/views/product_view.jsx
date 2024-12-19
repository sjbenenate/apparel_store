import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row, Image, ListGroup } from 'react-bootstrap';
import { Rating } from '../components/rating_widget';
import { useGetProductInfoQuery } from '../store/api_products';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';

export const ProductView = () => {
    const { productId } = useParams();
    const {
        data: queryData,
        isLoading,
        isError,
    } = useGetProductInfoQuery(productId);

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
                            <Button
                                variant="success"
                                type="button"
                                disabled={product.countInStock === 0}
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
            <Link className="btn btn-outline-light my-3" to="/">
                Back
            </Link>
            {isError ? (
                <Message variant="danger">Error loading product!</Message>
            ) : null}
            {isLoading ? <Loader /> : null}
            {queryData ? productInfo(queryData[0]) : null}
        </div>
    );
};
