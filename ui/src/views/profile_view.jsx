import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/form_container';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import OrdersHistory from '../components/orders_history';

const UserInfoItem = ({ label, value }) => {
    return (
        <ListGroup.Item>
            <Row>
                <Col>{`${label}: `}</Col>
                <Col>{value}</Col>
            </Row>
        </ListGroup.Item>
    );
};

const ProfileView = () => {
    const userInfo = useSelector(selectAuthInfo);

    return (
        <Container>
            <FormContainer>
                <h1>Profile</h1>
                <ListGroup>
                    <UserInfoItem label="Name" value={userInfo?.name} />
                    <UserInfoItem label="Email" value={userInfo?.email} />
                </ListGroup>
                <ListGroup>
                    <h2>Orders</h2>
                    <div>
                        <OrdersHistory />
                    </div>
                </ListGroup>
            </FormContainer>
        </Container>
    );
};

export default ProfileView;
