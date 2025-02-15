import { Container } from 'react-bootstrap';
import { useGetAllOrdersQuery } from '../../store/api_orders';
import OrdersHistory from '../../components/orders_history';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { useParams } from 'react-router-dom';
import PaginateNav from '../../components/paginate_nav';

const OrdersListView = () => {
    const params = useParams();
    const pageNumber = params?.pageNumber || 1;
    const pageCount = params?.pageCount || 2;
    const ordersQuery = useGetAllOrdersQuery({ pageNumber, pageCount });

    const orders = ordersQuery.isSuccess ? ordersQuery.data.orders : [];
    const orderCount = ordersQuery.isSuccess ? ordersQuery.data.orderCount : 0;

    return (
        <Container>
            <h1>Orders</h1>
            <div>
                <OrdersHistory orders={orders} />
                {orders.length > 0 && (
                    <PaginateNav
                        baseUrl={`/admin/orders/list`}
                        currentPage={pageNumber}
                        initialPageCount={pageCount}
                        totalCount={orderCount}
                    />
                )}
                {ordersQuery.isLoading ? <Loader /> : null}
                {ordersQuery.isError ? (
                    <Message variant="danger">Error loading orders</Message>
                ) : null}
            </div>
        </Container>
    );
};

export default OrdersListView;
