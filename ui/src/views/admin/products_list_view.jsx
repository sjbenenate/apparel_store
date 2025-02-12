import { Container, Col, Row, Table, Button, Image } from 'react-bootstrap';
import {
    useGetProductsQuery,
    useActivateProductMutation,
    useCreateProductMutation,
} from '../../store/api_products';
import { FaEdit, FaBan, FaCheck } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/message';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsListView = () => {
    const { data: products, refetch: refetchProducts } = useGetProductsQuery({
        activeOnly: false,
    });

    const [alertMessage, setAlertMessage] = useState(null);

    const [activateProduct, activateProductStatus] =
        useActivateProductMutation();

    const [createProduct, createProductState] = useCreateProductMutation();

    const navigate = useNavigate();

    const handleCreateProduct = async (e) => {
        console.log('handling product submit');
        e.preventDefault();
        try {
            const res = await createProduct({
                name: 'Name',
                description: 'description',
                brand: 'brand',
                category: 'sports',
                price: '10.00',
                countInStock: 0,
                image: '/images/airpods.jpg',
            }).unwrap();
            console.log(`Navigating to /admin/products/edit/${res._id}`);
            navigate(`/admin/products/edit/${res._id}`);
            setAlertMessage(null);
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    const getActivateHandler = (product) => {
        return async (e) => {
            const confirmed = window.confirm(
                `Please confirm ${
                    product.active ? 'deactivation' : 'activation'
                } of product '${product.name}'? `
            );
            if (confirmed) {
                console.log(
                    `Setting product id '${
                        product._id
                    }' active to '${!product.active}`
                );
                try {
                    await activateProduct({
                        productId: product._id,
                        active: !product.active,
                    });
                    setAlertMessage(null);
                    await refetchProducts();
                } catch (err) {
                    setAlertMessage(err?.data?.message || err?.error);
                }
            }
        };
    };

    const productTableRow = (product, index) => (
        <tr key={index}>
            <td>{product._id}</td>
            <td style={{ maxWidth: '40px', minWidth: '30px' }}>
                <Image src={product.image} alt={product.name} rounded fluid />
            </td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.countInStock}</td>
            <td>
                <LinkContainer to={`/admin/products/edit/${product._id}`}>
                    <Button variant="info" size="sm">
                        <FaEdit />
                    </Button>
                </LinkContainer>
            </td>
            <td>
                <Button
                    variant={!product.active ? 'danger' : 'success'}
                    size="sm"
                    onClick={getActivateHandler(product)}
                >
                    {!product.active ? <FaBan /> : <FaCheck />}
                </Button>
            </td>
        </tr>
    );

    return (
        <Container>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Button
                        className="m-3 btn-info"
                        onClick={handleCreateProduct}
                    >
                        <FaEdit /> New Product
                    </Button>
                </Col>
            </Row>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Row>
                <Table striped responsive hover className="table-sm">
                    <thead align="center">
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>Edit</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {products && products.length > 0 ? (
                            products.map((product, index) =>
                                productTableRow(product, index)
                            )
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ProductsListView;
