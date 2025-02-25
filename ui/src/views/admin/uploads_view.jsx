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
    console.log(`images redirect = '${redirect}'`);

    const imageCard = (imageData, index) => {
        return (
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card key={index} className="p-2 my-3">
                    <Image
                        src={`/${imageData}`}
                        alt={imageData}
                        rounded
                        fluid
                    />
                    <Card.Footer>{imageData}</Card.Footer>
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
