import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, ListGroup, Image } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../../components/form_container';
import {
    useGetProductInfoQuery,
    useUpdateProductMutation,
} from '../../store/api_products';
import Message from '../../components/message';
import { localTimeString } from '../../utils';
import Loader from '../../components/loader';
import Metadata from '../../components/metadata.jsx';
import { ToastContainer, toast } from 'react-toastify';

const inputSpacing = 'my-2';

const ProductEditView = () => {
    const productId = useParams()?.productId;
    const { data: product, isLoading: productLoading } =
        useGetProductInfoQuery(productId);

    const [updateProduct, updateProductStatus] = useUpdateProductMutation();

    const [inputName, setInputName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [alertMsg, setAlertMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!product?._id) {
            setAlertMessage('No product found');
            return;
        }
        setAlertMessage(null);
        setInputName(product?.name || '');
        setDescription(product?.description || '');
        setBrand(product?.brand || '');
        setCategory(product?.category || '');
        setPrice(product?.price || '');
        setCountInStock(product?.countInStock || 0);
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`updating product`);
        try {
            setAlertMessage(null);
            const res = await updateProduct({
                productId,
                name: inputName,
                description,
                brand,
                category,
                price,
                countInStock,
            }).unwrap();
            navigate(`/product/${res._id}`);
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    const getForm = () => {
        return (
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGroup controlId="name" className={inputSpacing}>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        type="text"
                        value={inputName}
                        placeholder="Product name"
                        onChange={(e) => setInputName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="brand" className={inputSpacing}>
                    <Form.Label>Brand: </Form.Label>
                    <Form.Control
                        type="text"
                        value={brand}
                        placeholder="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="description" className={inputSpacing}>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="category" className={inputSpacing}>
                    <Form.Label>Category: </Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        placeholder="Category or comma separated list of categories"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="price" className={inputSpacing}>
                    <Form.Label>Price: </Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        placeholder="Price with decimals (3.89)"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="qty-in-stock" className={inputSpacing}>
                    <Form.Label>Qty In Stock: </Form.Label>
                    <Form.Control
                        type="number"
                        value={countInStock}
                        placeholder="Quantity"
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </FormGroup>
                <Form.Group className="my-4 d-flex justify-content-between">
                    <LinkContainer to="/admin/products/list">
                        <Button variant="light">Cancel</Button>
                    </LinkContainer>
                    <Button type="submit" variant="info" autoFocus={true}>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        );
    };

    const productInfo = () => {
        return (
            <ListGroup>
                <ListGroup.Item>
                    <strong>ID: </strong>
                    {product?._id}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Last modified on: </strong>
                    {localTimeString(product?.updatedAt)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Created on: </strong>
                    {localTimeString(product?.createdAt)}
                </ListGroup.Item>
            </ListGroup>
        );
    };

    const ImageDisplay = (
        <div style={{ maxWidth: '400px' }}>
            <Image src={product?.image} alt={product?.name} rounded fluid />
            <p>
                <strong>Image url: </strong>
                {product?.image}
            </p>
            <Link
                to={`/admin/uploads/${productId}`}
                className="btn btn-info mb-3"
            >
                Change Image
            </Link>
        </div>
    );

    return (
        <FormContainer>
            <ToastContainer />
            <Metadata title={`Admin - Edit Product - ${productId}`} />
            <h1>Edit Product</h1>
            {alertMsg ? <Message variant="danger">{alertMsg}</Message> : null}
            {productLoading ? (
                <Loader />
            ) : (
                <>
                    {productInfo()}
                    {ImageDisplay}
                    {getForm()}
                </>
            )}
        </FormContainer>
    );
};

export default ProductEditView;
