import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row className="text-center py-3">
                    <Col>
                        <p>Apparel Outlet &copy; {year}</p>
                    </Col>
                </Row>
            </Container>
            ;
        </footer>
    );
};

export default Footer;
