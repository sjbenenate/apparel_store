import { useState } from 'react';
import {
    Container,
    Button,
    Card,
    Image,
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    useGetUploadedImagesQuery,
    useUpdateProductMutation,
    useGetProductInfoQuery,
    useUploadProductImageMutation,
} from '../../store/api_products';
import Message from '../../components/message';
import { useParams } from 'react-router-dom';
import { RouteButton } from '../../components/controls';
import { ToastContainer, toast } from 'react-toastify';

const UploadsView = () => {
    const navigate = useNavigate();
    const productId = useParams()?.productId;
    const [alertMsg, setAlertMsg] = useState(null);
    const { data: uploadedImages, error: imageError } =
        useGetUploadedImagesQuery();

    const {
        data: product,
        isLoading: productLoading,
        refetch: refetchProduct,
    } = useGetProductInfoQuery(productId);

    const [updateProduct, { isLoading: updateLoading, error: updateError }] =
        useUpdateProductMutation();

    const [uploadImage, { isLoading: imageIsLoading }] =
        useUploadProductImageMutation();

    const handleImageUpdate = async (imageData) => {
        console.log(`Updating product image to ${imageData}`);
        try {
            setAlertMsg(null);
            const res = await updateProduct({
                productId,
                image: imageData,
            }).unwrap();
            toast.info(res);
            refetchProduct();
            //navigate(`/admin/products/edit/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message);
            setAlertMsg(err?.data?.message);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!e.target.files[0]) return;
        try {
            let formData = new FormData();
            formData.append('product-image', e.target.files[0]);
            const res = await uploadImage(formData).unwrap();
            console.log(res?.message);
            await handleImageUpdate(res?.imageUrl);
        } catch (err) {
            const msg = err?.data?.message || err?.error;
            setAlertMsg(msg);
            toast.error(msg);
        }
    };

    const imageCard = (imageData, index) => {
        const fileName = imageData.split('\\')[1];
        return (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="p-2 my-3">
                    <Image src={imageData} alt={fileName} rounded fluid />
                    <Card.Footer className="d-flex flex-column text-center">
                        <p>{fileName}</p>
                        <Button
                            variant="info"
                            onClick={() => handleImageUpdate(imageData)}
                            disabled={updateLoading}
                        >
                            Select
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    };

    const UploadForm = (
        <Form>
            <Form.Group controlId="product-image">
                <Form.Label>Add new image</Form.Label>
                <Form.Control
                    type="file"
                    name="product-image"
                    disabled={imageIsLoading || updateLoading}
                    onChange={handleImageUpload}
                />
            </Form.Group>
        </Form>
    );

    return (
        <Container>
            <ToastContainer />
            <RouteButton to={`/admin/products/edit/${productId}`}>
                Cancel
            </RouteButton>
            <h1>Image Update</h1>
            {(alertMsg || imageError) && (
                <Message
                    variant="danger"
                    children={alertMsg || imageError?.data?.message}
                />
            )}
            {product && (
                <Row className="my-3">
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <h4>Currently</h4>
                        <p>
                            <strong>Product name: </strong>
                            {product.name}
                        </p>
                        <p>
                            <strong>Image url: </strong>
                            {product.image}
                        </p>
                        <Image
                            src={product.image}
                            alt={product.name}
                            rounded
                            fluid
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <h4>Upload New</h4>
                        {UploadForm}
                    </Col>
                </Row>
            )}

            {uploadedImages && (
                <Row>
                    <h2>Uploaded Images</h2>
                    {uploadedImages.map((uploadData, index) =>
                        imageCard(uploadData, index)
                    )}
                </Row>
            )}
        </Container>
    );
};

export default UploadsView;
