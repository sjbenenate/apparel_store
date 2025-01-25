import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findOrders,
    findOrderById,
    saveOrder,
    modifyOrder,
    findUser,
} from '../data/db_interface.js';
import {
    CheckoutPaymentIntent,
    CaptureStatus,
} from '@paypal/paypal-server-sdk';
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

const createPayTransaction = asyncHandler(async (req, res) => {
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
        prefer: 'return=minimal',
    };

    try {
        const paypalRes = await paypalOrdersController.ordersCreate(payload);
        console.log('paypal response received');
        //return the paypal order id here
        if (paypalRes?.statusCode === 201) {
            console.log(
                `Updating order ${order._id} with paypal id ${paypalRes.result.id}`
            );
            order.paymentId = paypalRes.result.id;
            await saveOrder(order);
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

const capturePayTransaction = asyncHandler(async (req, res) => {
    const orderId = req.params?.id;
    const paymentId = req.body?.paymentId;
    let order = await findOrderById(orderId);
    try {
        const paypalRes = await paypalOrdersController.ordersCapture({
            id: paymentId,
        });
        order.paymentDetails = JSON.stringify(paypalRes.result);
        order.isPaid = paypalRes.result.status === CaptureStatus.Completed;
        await saveOrder(order);
        if (order.isPaid) {
            res.status(201).json({ isPaid: order.isPaid });
        } else {
            res.status(500).json({
                message: `Paypal payment status returned is ${paypalRes?.result?.status}`,
            });
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    res.status(201).json({ orderId: order._id });
    console.log(`order created ${order._id}`);
});

export {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    createPayTransaction,
    capturePayTransaction,
    updateOrderToDelivered,
    addToOrder,
};
