import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findOrders,
    findOrderById,
    saveOrder,
    modifyOrder,
    findUser,
} from '../data/db_interface.js';
import { CheckoutPaymentIntent } from '@paypal/paypal-server-sdk';
import paypalOrdersController from './paypal_controller.js';

const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params?.id;
    console.log(`get order by id: ${orderId}`);
    const order = await findOrderById(orderId);
    const user = await findUser({ id: order.userId });
    if (order) {
        res.status(200).json({ order, user });
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
    const orders = await findOrders(userId);
    console.log(`get orders by user ${req?.user?.name}`);
    res.status(200).json(orders);
});

const payOrderWithPayPal = asyncHandler(async (req, res) => {
    const orderId = req.params?.id;
    const order = await findOrderById(orderId);
    const user = await findUser({ id: order.userId });
    if (!order) {
        res.status(500).json({ message: 'Order was not found' });
    }

    const payload = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: 'USD',
                        value: String(order.totalPrice),
                    },
                },
            ],
            shipping: {
                name: {
                    full_name: user.name,
                },
                address: {
                    address_line_1: order?.shippingAddress?.streetAddress,
                    address_line_2: order?.shippingAddress?.city,
                    //admin_area_2: 'San Jose',
                    //admin_area_1: 'CA',
                    postal_code: order?.shippingAddress?.postalCode,
                    country_code: order?.shippingAddress?.country,
                },
            },
        },
        //prefer: 'return=minimal',
    };

    try {
        const paypalRes = await paypalOrdersController.ordersCreate(payload);
        console.log('paypal response received');
        //return the paypal order id here
        if (paypalRes?.statusCode === 201) {
            res.status(201).json(paypalRes.result);
        } else {
            console.log('How did I get here?'); // TODO read Paypal docs on other responses for errors
            res.status(500).json({ message: "I'm lost" });
        }
    } catch (err) {
        console.warn('paypal response was bad');
        throw new Error('Bad paypal response');
    }
    // TODO: what happens here if shipping address was changed in PayPal window?
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

const addToOrder = asyncHandler(async (req, res) => {
    console.log('add to order started');
    const shippingAddress = req.body?.shippingAddress;
    const orderItems = req.body?.orderItems;
    const { paymentMethod, orderPrice, shippingPrice, taxPrice, totalPrice } =
        req.body;

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
        taxPrice,
        totalPrice,
        paymentMethod,
    };
    const order = await saveOrder(orderPayload);
    res.status(200).json({ orderId: order._id });
    console.log(`order created ${order._id}`);
});

export {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    payOrderWithPayPal,
    updateOrderToDelivered,
    addToOrder,
};
