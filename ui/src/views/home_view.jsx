import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../components/product_card.jsx';
import { useGetProductsQuery } from '../store/api_products.js';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useParams } from 'react-router-dom';
import PaginateNav from '../components/paginate_nav.jsx';

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
        <>
            <h1>New Products</h1>
            {isError ? (
                <Message
                    variant="danger"
                    children={'Error loading products!'}
                />
            ) : null}
            {isLoading ? <Loader /> : null}
            <Row>
                {newProductsList(products)}
                <PaginateNav
                    currentPage={pageNumber}
                    initialPageCount={pageCount}
                    totalCount={productCount}
                    baseUrl={searchKeyword ? `/search/${searchKeyword}` : ''}
                />
            </Row>
        </>
    );
};
