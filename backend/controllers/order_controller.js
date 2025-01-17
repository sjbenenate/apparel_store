import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findOrders,
    findOrderById,
    saveOrder,
    modifyOrder,
} from '../data/db_interface.js';

const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params?.id;
    console.log(`get order by id: ${orderId}`);
    const order = await findOrderById(orderId);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order could not be found');
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    console.log('get all orders');
    const orders = await findOrders();
    res.status(200).json(orders);
});

const getOrdersByUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orders = await findOrders({ userId });
    console.log(`get orders by user ${req?.user?.name}`);
    res.status(200).json(orders);
});

const updateOrderToPayed = asyncHandler(async (req, res) => {
    res.send('update order to payed');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

const addToOrder = asyncHandler(async (req, res) => {
    console.log('add to order started');
    const shippingAddress = JSON.parse(req.body?.shippingAddress);
    const orderItems = JSON.parse(req.body?.orderItems);
    const { paymentMethod, orderPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length < 1) {
        res.status(400);
        throw new Error('No items in order');
    }
    const orderPayload = {
        userId: req.user._id,
        orderItems: orderItems.map((item) => {
            return {
                ...item,
                productId: item._id,
                _id: undefined,
            };
        }),
        shippingAddress,
        orderPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
    };
    const order = await saveOrder(orderPayload);
    res.json(order);
});

export {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    updateOrderToPayed,
    updateOrderToDelivered,
    addToOrder,
};
