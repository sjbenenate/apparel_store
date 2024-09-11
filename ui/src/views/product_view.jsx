import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row, Image, ListGroup } from 'react-bootstrap';
import { Rating } from '../components/rating_widet';
import products from '../products';

export const ProductView = () => {
  const { productId } = useParams();
  const product = products.find((p) => p._id === productId);
  console.debug(product);
  return (
    <div className="my-3 p-3">
      <Link class="btn btn-outline-light my-3" to="/">
        Back
      </Link>
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
              <p>{product.countInStock ? 'In Stock' : 'Not In Stock'}</p>
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
    </div>
  );
};
