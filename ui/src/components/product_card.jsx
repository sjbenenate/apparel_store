import { Card } from 'react-bootstrap';

export const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image}></Card.Img>
      </a>
      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        ${product.price}
      </Card.Body>
    </Card>
  );
};
