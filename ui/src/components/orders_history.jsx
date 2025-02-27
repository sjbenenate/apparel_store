import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { localTimeString, localDateString } from '../utils';

const OrderRow = ({ order }) => {
    return (
        <LinkContainer to={`/order/${order._id}`}>
            <tr>
                <td>{order._id}</td>
                <td>{localTimeString(order.createdAt)}</td>
                <td>{order?.orderItems?.length}</td>
                <td>
                    {order.isPaid ? (
                        localDateString(order.paidAt)
                    ) : (
                        <FaTimes color="red" />
                    )}
                </td>
                <td>
                    {order.isDelivered ? (
                        localDateString(order.deliveredAt)
                    ) : (
                        <FaTimes color="red" />
                    )}
                </td>
            </tr>
        </LinkContainer>
    );
};

const OrdersHistory = ({ orders }) => {
    return (
        <Table striped responsive hover className="table-sm">
            <thead align="center">
                <tr>
                    <td>Order ID</td>
                    <td>Date</td>
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
