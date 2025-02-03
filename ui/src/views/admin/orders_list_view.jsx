import { Container } from 'react-bootstrap';
import { useGetAllOrdersQuery } from '../../store/api_orders';
import OrdersHistory from '../../components/orders_history';
import Loader from '../../components/loader';
import Message from '../../components/message';

const OrdersListView = () => {
    const ordersQuery = useGetAllOrdersQuery();

    return (
        <Container>
            <h1>Orders</h1>
            <div>
                <OrdersHistory
                    orders={ordersQuery.isSuccess ? ordersQuery.data : []}
                />
                {ordersQuery.isLoading ? <Loader /> : null}
                {ordersQuery.isError ? (
                    <Message variant="danger">Error loading orders</Message>
                ) : null}
            </div>
        </Container>
    );
};

export default OrdersListView;
