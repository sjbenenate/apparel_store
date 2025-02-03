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
                    shipping: {
                        name: {
                            full_name: user.name,
                        },
                        address: {
                            addressLine1: order?.shippingAddress?.streetAddress,
                            adminArea2: order?.shippingAddress?.city,
                            adminArea1: order?.shippingAddress?.state,
                            postalCode: order?.shippingAddress?.postalCode,
                            countryCode: order?.shippingAddress?.country,
                        },
                    },
                },
            ],
            payment_source: {
                paypal: {
                    shipping_preference: 'SET_PROVIDED_ADDRESS',
                },
            },
        },
        prefer: 'return=minimal',
    };

    const paypalRes = await paypalOrdersController.ordersCreate(payload);
    const statusCode = paypalRes.statusCode;
    switch (statusCode) {
        case 200:
        // fall through to 201 handling
        case 201:
            console.log(
                `Updating order ${order._id} with paypal id ${paypalRes.result.id}`
            );
            const paymentId = paypalRes.result.id;
            order.paymentId = paymentId;
            await saveOrder(order);
            res.status(201).json({ id: paymentId });
            break;
        case 400:
        // fall through to 422 below
        case 422:
            console.log('Paypal error response');
            console.log(
                `${paypalRes?.result?.name} (${paypalRes?.result?.debug_id}): ${paypalRes?.result?.message}`
            );
            res.status(statusCode).json({
                message: `${paypalRes?.result?.name} (${paypalRes?.result?.debug_id}): ${paypalRes?.result?.message}`,
            });
            break;
        default:
            console.error(paypalRes?.result);
            throw new Error('Paypal create order error');
            break;
    }

    // TODO: what happens here if shipping address was changed in PayPal window?
});

const capturePayTransaction = asyncHandler(async (req, res) => {
    const orderId = req.params?.id;
    const paymentId = req.body?.paymentId;
    let order = await findOrderById(orderId);
    const paypalRes = await paypalOrdersController.ordersCapture({
        id: paymentId,
    });
    switch (paypalRes.statusCode) {
        case 200:
        case 201:
            order.paymentDetails = JSON.stringify(paypalRes.result);
            order.isPaid = paypalRes.result.status === CaptureStatus.Completed;
            order.shippingAddress = {
                name: paypalRes.result?.purchaseUnits[0]?.shipping?.name
                    ?.fullName,
                streetAddress:
                    paypalRes.result?.purchaseUnits[0]?.shipping?.address
                        ?.addressLine1,
                city: paypalRes.result?.purchaseUnits[0]?.shipping?.address
                    ?.adminArea2,
                state: paypalRes.result?.purchaseUnits[0]?.shipping?.address
                    ?.adminArea1,
                postalCode:
                    paypalRes.result?.purchaseUnits[0]?.shipping?.address
                        ?.postalCode,
                country:
                    paypalRes.result?.purchaseUnits[0]?.shipping?.address
                        ?.countryCode,
            };
            await saveOrder(order);
            if (order.isPaid) {
                res.status(201).json({ isPaid: order.isPaid });
            } else {
                res.status(500).json({
                    message: `Paypal payment status returned is ${paypalRes?.result?.status}`,
                });
            }
            break;
        case 403:
        case 404:
        case 422:
            console.log('Paypal error response');
            console.log(
                `${paypalRes?.result?.name} (${paypalRes?.result?.debug_id}): ${paypalRes?.result?.message}`
            );
            res.status(statusCode).json({
                message: `${paypalRes?.result?.name} (${paypalRes?.result?.debug_id}): ${paypalRes?.result?.message}`,
            });
            break;
        default:
            console.error(paypalRes?.result);
            throw new Error('Paypal create order error');
            break;
    }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

const createUserOrder = asyncHandler(async (req, res) => {
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
    createUserOrder,
};
