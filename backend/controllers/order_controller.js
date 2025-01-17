import { asyncHandler } from '../middleware/async_handler_middleware.js';
import { findOrders, saveOrder, modifyOrder } from '../data/db_interface.js';

const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by id');
});

const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

const getOrdersByUser = asyncHandler(async (req, res) => {
    res.send(`get orders by user ${req?.user?.name}`);
});

const updateOrderToPayed = asyncHandler(async (req, res) => {
    res.send('update order to payed');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

const addToOrder = asyncHandler(async (req, res) => {
    res.send('add to order');
});

export {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    updateOrderToPayed,
    updateOrderToDelivered,
    addToOrder,
};
