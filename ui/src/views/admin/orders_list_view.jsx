import { Container, ListGroup } from 'react-bootstrap';
import { useGetAllOrdersQuery } from '../../store/api_orders';

const OrdersListView = () => {
    const orderQuery = useGetAllOrdersQuery();

    return (
        <Container>
            <h1>Orders</h1>
            {orderQuery.data ? (
                <ListGroup>
                    {orderQuery.data.map((order, index) => (
                        <ListGroup.Item key={index}>{order._id}</ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No orders found</p>
            )}
        </Container>
    );
};

export default OrdersListView;
