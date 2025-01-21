import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductRowSmall = ({
    image,
    name,
    productId,
    price,
    qty,
    description,
}) => {
    return (
        <Row className="py-2 align-items-center">
            <Col sm="2">
                <Image src={image} alt={name} rounded fluid />
            </Col>
            <Col>
                <Link to={`/product/${productId}`}>{name}</Link>
            </Col>
            <Col>
                ${price} x {qty} = ${price * qty}
            </Col>
        </Row>
    );
};

export { ProductRowSmall };
