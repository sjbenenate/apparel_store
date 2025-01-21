import { Row, Col } from 'react-bootstrap';

const Address = ({ streetAddress, city, postalCode, country }) => {
    const labelColWidth = '3';
    return (
        <div>
            <Row>
                <Col sm={labelColWidth}>
                    <strong>Street:</strong>
                </Col>
                <Col>{streetAddress}</Col>
            </Row>
            <Row>
                <Col sm={labelColWidth}>
                    <strong>City:</strong>
                </Col>
                <Col>{city}</Col>
            </Row>
            <Row>
                <Col sm={labelColWidth}>
                    <strong>Postal Code:</strong>
                </Col>
                <Col>{postalCode}</Col>
            </Row>
            <Row>
                <Col sm={labelColWidth}>
                    <strong>Country:</strong>
                </Col>
                <Col>{country}</Col>
            </Row>
        </div>
    );
};

export default Address;
