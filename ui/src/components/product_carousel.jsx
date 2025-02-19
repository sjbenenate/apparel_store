import { Carousel, Image, Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../store/api_products';
import { Rating } from './rating_widget';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
    const {
        data: queryData,
        isError,
        isLoading,
    } = useGetProductsQuery({
        activeOnly: true,
        pageNumber: 1,
        pageCount: 3,
        sortKey: 'rating',
        sortDirection: 'down',
    });
    const products = queryData ? queryData.products : [];

    const carouselRow = (product) => {
        return (
            <Carousel.Item className="bg-dark">
                <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none text-secondary"
                >
                    <Row>
                        <Col xs={12} sm={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                rounded
                                style={{ maxHeight: '500px' }}
                            />
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            className="d-flex flex-column justify-content-center align-items-center text-center"
                        >
                            <h2>{product.name}</h2>
                            <div className="d-flex align-items-center pb-5">
                                <Rating
                                    value={product.rating}
                                    className="d-inline-block pt-1"
                                />
                                <h4 className="mt-2 d-inline-block">
                                    ${product.price}
                                </h4>
                            </div>
                        </Col>
                    </Row>
                </Link>
            </Carousel.Item>
        );
    };
    return <Carousel>{products.map((p) => carouselRow(p))}</Carousel>;
};

export default ProductCarousel;
