import { useState } from 'react';
import { Container, Button, Card, Image, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetUploadedImagesQuery } from '../../store/api_products';
import Message from '../../components/message';
import { useLocation } from 'react-router-dom';

const UploadsView = () => {
    const [alertMsg, setAlertMsg] = useState(null);
    const { data: uploadedImages, error: imageError } =
        useGetUploadedImagesQuery();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');

    const handleImageUpdate = (imageData) => {
        console.log(`Updating to ${imageData}`);
    };

    const imageCard = (imageData, index) => {
        const fileName = imageData.split('\\')[1];
        return (
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card key={index} className="p-2 my-3">
                    <Image src={`/${imageData}`} alt={fileName} rounded fluid />
                    <Card.Footer className="d-flex flex-column text-center">
                        <p>{fileName}</p>
                        <Button
                            variant="info"
                            onClick={() => handleImageUpdate(imageData)}
                        >
                            Select
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    };

    return (
        <Container>
            <h1>Uploaded Images</h1>
            {(alertMsg || imageError) && (
                <Message
                    variant="danger"
                    children={alertMsg || imageError?.data?.message}
                />
            )}
            {uploadedImages && (
                <Row>
                    {uploadedImages.map((uploadData, index) =>
                        imageCard(uploadData, index)
                    )}
                </Row>
            )}
        </Container>
    );
};

export default UploadsView;
