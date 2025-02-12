import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, ListGroup } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../../components/form_container';
import {
    useGetProductInfoQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../store/api_products';
import Message from '../../components/message';
import { localTimeString } from '../../utils';

const inputSpacing = 'my-2';

const ProductEditView = () => {
    const productId = useParams()?.productId;
    const { data: product, isLoading: productLoading } =
        useGetProductInfoQuery(productId);

    const [updateProduct, updateProductStatus] = useUpdateProductMutation();
    const [uploadImage, { isLoading: imageIsLoading }] =
        useUploadProductImageMutation();

    const [inputName, setInputName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [imageUrl, setImageUrl] = useState('/images/airpods.jpg');
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
        setImageUrl(product?.image || '');
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
                image: imageUrl,
            }).unwrap();
            navigate(`/product/${res._id}`);
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    const handleImageUpload = async (e) => {
        if (!e.target.files[0]) return;
        try {
            let formData = new FormData();
            formData.append('product-image', e.target.files[0]);
            const res = await uploadImage(formData).unwrap();
            console.log(res?.message);
            setImageUrl(res.imageUrl);
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    return (
        <FormContainer>
            <h1>Edit Product</h1>
            {product?._id ? (
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
            ) : null}

            {alertMsg ? <Message variant="danger">{alertMsg}</Message> : null}
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
                <FormGroup controlId="image-url" className={inputSpacing}>
                    <Form.Label>Current Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={imageUrl}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="product-image" className={inputSpacing}>
                    <Form.Label>Upload New Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="product-image"
                        disabled={imageIsLoading}
                        onChange={handleImageUpload}
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
        </FormContainer>
    );
};

export default ProductEditView;
