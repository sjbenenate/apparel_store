import { Row, Col, Container } from 'react-bootstrap';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container className="text-center py-3">
        <Row>
          <Col>
            <p>Copyright &copy; {year}</p>
          </Col>
        </Row>
      </Container>
      ;
    </footer>
  );
};
