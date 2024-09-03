import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import products from '../products.js';

const newProductsList = (products) => {
  return products.map((pData) => {
    console.debug(pData);
    return (
      <Col key={pData._id} xs={12} sm={6} md={4} lg={3}>
        <ProductCard product={pData} />
      </Col>
    );
  });
};

export const HomeView = () => {
  return (
    <>
      <h1>New Products</h1>
      <Row>{newProductsList(products)}</Row>
    </>
  );
};
