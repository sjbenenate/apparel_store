import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../store/api_orders';

const OrdersHistory = () => {
    const ordersQuery = useGetUserOrdersQuery();
    const orders = ordersQuery.data
        ? ordersQuery.data.toSorted(
              (o1, o2) => new Date(o1.createdAt) > new Date(o2.createdAt) // TODO is not sorting as expected
          )
        : [];

    return (
        <Table>
            <thead>
                <tr>
                    <td>Order ID</td>
                    <td>Items</td>
                    <td>Paid</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <Link to={`/order/${order._id}`}>
                                    {order._id}
                                </Link>
                            </td>
                            <td>
                                <strong>Items: </strong>
                                {order.orderItems.length}
                            </td>
                            <td
                                style={{
                                    background: order.isPaid ? 'green' : 'red',
                                }}
                            >
                                {order.isPaid ? 'Yes' : 'No'}
                            </td>
                            <td>
                                <strong>Date: </strong>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default OrdersHistory;
