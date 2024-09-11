import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Rating } from './rating_widet';

export const ProductCard = ({ product }) => {
  const linkUrl = `/product/${product._id}`;
  return (
    <Card className="my-3 p-3">
      <Link to={linkUrl}>
        <Card.Img src={product.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={linkUrl}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            msg={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="p">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
