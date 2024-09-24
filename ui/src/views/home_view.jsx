import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import axios from 'axios';

const newProductsList = (products) => {
    if (products.length === 0) {
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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/products')
            .then((res) => {
                if (!res.data.error) {
                    setProducts(res.data);
                }
            })
            .catch((err) => console.error(err));
    }, [setProducts]);

    return (
        <>
            <h1>New Products</h1>
            <Row>{newProductsList(products)}</Row>
        </>
    );
};
