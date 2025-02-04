import { Container, Col, Row, Table, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../../store/api_products';
import { FaEdit } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const ProductTableHead = () => {
    return (
        <thead align="center">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>In Stock</th>
                <th>Edit</th>
            </tr>
        </thead>
    );
};

const ProductTableRow = ({ product }) => {
    return (
        <tr>
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
        </tr>
    );
};

const ProductsListView = () => {
    const { data: products, refetch: refetchProducts } =
        useGetProductsQuery(false);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col></Col>
                <Col className="flex-sm-shrink-1">
                    <LinkContainer to={`/admin/products/new`}>
                        <Button>
                            <FaEdit /> New Product
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Table striped responsive hover className="table-sm">
                    <ProductTableHead />
                    <tbody align="center">
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductTableRow
                                    product={product}
                                    key={index}
                                />
                            ))
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
