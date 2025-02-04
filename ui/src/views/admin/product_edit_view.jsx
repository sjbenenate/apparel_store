import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ProductEditView = () => {
    const productId = useParams()?.productId;

    return (
        <Container>
            <h1>Edit Product</h1>
            <p>{productId}</p>
        </Container>
    );
};

export default ProductEditView;
