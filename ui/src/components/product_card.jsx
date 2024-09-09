import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="my-3 p-3">
        <Card.Img src={product.image}></Card.Img>
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          ${product.price}
        </Card.Body>
      </Card>
    </Link>
  );
};
