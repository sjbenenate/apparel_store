import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import { useGetProductsQuery } from '../store/api_products.js';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useParams, Link } from 'react-router-dom';
import PaginateNav from '../components/paginate_nav.jsx';
import Search from '../components/search.jsx';
import ProductCarousel from '../components/product_carousel.jsx';
import Metadata from '../components/metadata.jsx';

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
    const params = useParams();
    const pageNumber = params?.pageNumber || 1;
    const pageCount = params?.pageCount || 3;
    const searchKeyword = params?.keyword;
    const {
        data: productData,
        isLoading,
        isError,
    } = useGetProductsQuery({
        activeOnly: true,
        pageNumber,
        pageCount,
        searchKeyword,
    });
    const { products, productCount } = productData || {};

    return (
        <Container>
            <Metadata title="Peacock Apparel" />
            {!searchKeyword && (
                <Row>
                    <ProductCarousel />
                </Row>
            )}
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="d-flex justify-content-sm-end">
                    <Search baseUrl="" />
                </Col>
            </Row>
            {searchKeyword && (
                <Row>
                    <Col sm="2">
                        <Link to="/" className="btn btn-outline-light my-2">
                            Go Back
                        </Link>
                    </Col>
                </Row>
            )}
            <Row>
                {isError ? (
                    <Message
                        variant="danger"
                        children={'Error loading products!'}
                    />
                ) : null}
                {isLoading ? <Loader /> : null}
            </Row>
            <Row>
                {newProductsList(products)}
                <PaginateNav
                    currentPage={pageNumber}
                    initialPageCount={pageCount}
                    totalCount={productCount}
                    baseUrl={searchKeyword ? `/search/${searchKeyword}` : ''}
                />
            </Row>
        </Container>
    );
};
