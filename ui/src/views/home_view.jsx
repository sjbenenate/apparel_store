import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import { useGetProductsQuery } from '../store/api_products.js';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';

const newProductsList = (products) => {
    if (!products) {
        return null;
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
    const {
        data: products,
        isLoading,
        isError,
    } = useGetProductsQuery({ activeOnly: true });

    return (
        <>
            <h1>New Products</h1>
            {isError ? (
                <Message
                    variant="danger"
                    children={'Error loading products!'}
                />
            ) : null}
            {isLoading ? <Loader /> : null}
            <Row>{newProductsList(products)}</Row>
        </>
    );
};
