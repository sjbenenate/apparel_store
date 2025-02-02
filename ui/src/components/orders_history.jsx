import { Table } from 'react-bootstrap';
import { useGetUserOrdersQuery } from '../store/api_orders';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';

const OrdersHistory = () => {
    const ordersQuery = useGetUserOrdersQuery();
    const orders = ordersQuery.data
        ? ordersQuery.data.toSorted(
              (o1, o2) => new Date(o1.createdAt) > new Date(o2.createdAt) // TODO is not sorting as expected
          )
        : [];

    return (
        <Table striped responsive hover className="table-sm">
            <thead align="center">
                <tr>
                    <td>Date</td>
                    <td>Order ID</td>
                    <td>Items</td>
                    <td>Paid</td>
                    <td>Delivered</td>
                </tr>
            </thead>
            <tbody align="center">
                {orders.map((order, index) => {
                    return (
                        <LinkContainer to={`/order/${order._id}`} key={index}>
                            <tr>
                                <td>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>{order._id}</td>
                                <td>{order.orderItems.length}</td>
                                <td
                                    style={{
                                        background: order.isPaid
                                            ? 'green'
                                            : 'red',
                                    }}
                                >
                                    {order.isPaid ? 'Yes' : 'No'}
                                </td>
                                <td>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        </LinkContainer>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default OrdersHistory;
