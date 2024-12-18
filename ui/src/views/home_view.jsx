import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import { useGetProductsQuery } from '../store/api_products.js';

const newProductsList = (products) => {
    if (products === undefined || products.length === 0) {
        return <Col>Loading...</Col>;
    }
    return products.map((pData) => {
        return (
            <Col key={pData._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={pData} />
            </Col>
        );
    });
};

export const HomeView = () => {
    const { data: products } = useGetProductsQuery();

    return (
        <>
            <h1>New Products</h1>
            <Row>{newProductsList(products)}</Row>
        </>
    );
};
