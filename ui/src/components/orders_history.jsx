import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';

const OrderRow = ({ order }) => {
    return (
        <LinkContainer to={`/order/${order._id}`}>
            <tr>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order._id}</td>
                <td>{order?.orderItems?.length}</td>
                <td
                    style={{
                        background: order.isPaid ? 'green' : 'red',
                    }}
                >
                    {order.isPaid ? 'Yes' : 'No'}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
        </LinkContainer>
    );
};

const OrdersHistory = ({ orders }) => {
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
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <OrderRow order={order} key={index} />
                    ))
                ) : (
                    <tr></tr>
                )}
            </tbody>
        </Table>
    );
};

export default OrdersHistory;
