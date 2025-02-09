import { Button, Form, FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/form_container';
import { useCreateProductMutation } from '../../store/api_products';
import { useState } from 'react';
import Message from '../../components/message';
import { roundDecimals } from '../../utils';

const ProductCreateView = () => {
    const [inputName, setInputName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [imageUrl, setImageUrl] = useState('/images/airpods.jpg');
    const [alertMsg, setAlertMessage] = useState(null);

    const [createProduct, createProductState] = useCreateProductMutation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('handling product submit');
        e.preventDefault();
        try {
            const res = await createProduct({
                name: inputName,
                description,
                brand,
                category,
                price: roundDecimals(price),
                countInStock,
                image: imageUrl,
            }).unwrap();
            console.log(`Navigating to /admin/products/edit/${res._id}`);
            navigate(`/admin/products/edit/${res._id}`);
            setAlertMessage(null);
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    const inputSpacing = 'my-2';

    return (
        <FormContainer>
            <h1>Create New Product</h1>
            {alertMsg ? <Message variant="danger">{alertMsg}</Message> : null}
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="name" className={inputSpacing}>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        value={inputName}
                        placeholder="Product name"
                        onChange={(e) => setInputName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="brand" className={inputSpacing}>
                    <Form.Label>Brand: </Form.Label>
                    <Form.Control
                        value={brand}
                        placeholder="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="description" className={inputSpacing}>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="category" className={inputSpacing}>
                    <Form.Label>Category: </Form.Label>
                    <Form.Control
                        value={category}
                        placeholder="Category or comma separated list of categories"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="price" className={inputSpacing}>
                    <Form.Label>Price: </Form.Label>
                    <Form.Control
                        value={price}
                        placeholder="Price with decimals (3.89)"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="qty-in-stock" className={inputSpacing}>
                    <Form.Label>Qty In Stock: </Form.Label>
                    <Form.Control
                        value={countInStock}
                        placeholder="Quantity"
                        onChange={(e) =>
                            setCountInStock(Number(e.target.value))
                        }
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

export default ProductCreateView;
