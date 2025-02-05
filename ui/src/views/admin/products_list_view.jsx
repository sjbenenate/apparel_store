import { Container, Col, Row, Table, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../../store/api_products';
import { FaEdit, FaBan, FaCheck } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const ProductsListView = () => {
    const { data: products, refetch: refetchProducts } =
        useGetProductsQuery(false);

    const getActivateHandler = (product) => {
        return (e) => {
            window.confirm(
                `${product.disabled ? 'Active' : 'Deactive'} product '${
                    product.name
                }'? `
            );
        };
    };

    const productTableRow = (product, index) => (
        <tr key={index}>
            <td>{product._id}</td>
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
                    variant={product.disabled ? 'danger' : 'success'}
                    size="sm"
                    onClick={getActivateHandler(product)}
                >
                    {product.disabled ? <FaBan /> : <FaCheck />}
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
                    <LinkContainer to={`/admin/products/new`}>
                        <Button className="m-3">
                            <FaEdit /> New Product
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Table striped responsive hover className="table-sm">
                    <thead align="center">
                        <tr>
                            <th>ID</th>
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
