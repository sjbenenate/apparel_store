import { Container, Col, Row, Table, Button, Image } from 'react-bootstrap';
import {
    useGetProductsQuery,
    useActivateProductMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../store/api_products';
import { FaEdit, FaBan, FaCheck, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PaginateNav from '../../components/paginate_nav';

const ProductsListView = () => {
    const params = useParams();
    const pageNumber = params?.pageNumber || 1;
    const pageCount = params?.pageCount || 3;

    const {
        data: productData,
        refetch: refetchProducts,
        //isError: productsIsError,
        //error: productsError,
    } = useGetProductsQuery({
        activeOnly: false,
        pageNumber,
        pageCount,
    });
    const { products, productCount } = productData || {};

    const [activateProduct, activateProductStatus] =
        useActivateProductMutation();

    const [createProduct, createProductStatus] = useCreateProductMutation();

    const [deleteProduct, deleteProductStatus] = useDeleteProductMutation();

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
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    };

    const getActivateHandler = (product) => {
        return async (e) => {
            const confirmed = window.confirm(
                `${product.active ? 'Deactivate' : 'Activate'} product '${
                    product.name
                }'? `
            );
            if (confirmed) {
                console.log(
                    `Setting product id '${
                        product._id
                    }' active to '${!product.active}`
                );
                try {
                    const res = await activateProduct({
                        productId: product._id,
                        active: !product.active,
                    }).unwrap();
                    await refetchProducts();
                    toast.success(
                        `Product has been ${
                            res.active ? 'activated' : 'deactivated'
                        }`
                    );
                } catch (err) {
                    toast.error(err?.data?.message || err?.error);
                }
            }
        };
    };

    const deleteHandler = async (e, product) => {
        console.log(`delete handler for '${product.name}'`);
        if (window.confirm(`Delete product '${product.name}'?`)) {
            try {
                const res = await deleteProduct({ productId: product._id });
                if (res?.data?.success) {
                    toast.success('Product was deleted');
                } else {
                    toast.error(
                        res?.data?.message ||
                            res?.error?.data?.message ||
                            'Error deleting product'
                    );
                }
            } catch (err) {
                toast.error(err?.data?.message || err?.error);
            }
        }
    };

    const productTableRow = (product, index) => (
        <tr key={index}>
            <td>{product._id}</td>
            <td style={{ maxWidth: '40px', minWidth: '30px' }}>
                <Image src={product.image} alt={product.name} rounded fluid />
            </td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>${product.price}</td>
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
            <td>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => deleteHandler(e, product)}
                >
                    <FaTrash />
                </Button>
            </td>
        </tr>
    );

    const productTable = (products) => {
        if (!products || products.length === 0) {
            return <p>No Products found</p>;
        }
        return (
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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {products.map((product, index) =>
                        productTableRow(product, index)
                    )}
                </tbody>
            </Table>
        );
    };

    return (
        <Container>
            <ToastContainer />
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
            <Row>
                {productTable(products)}
                {products && (
                    <PaginateNav
                        currentPage={pageNumber}
                        initialPageCount={pageCount}
                        totalCount={productCount}
                        baseUrl="/admin/products/list"
                    />
                )}
            </Row>
        </Container>
    );
};

export default ProductsListView;
