import env from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

import userModel from './models/user_model.js';
import productModel from './models/product_model.js';
import orderModel from './models/order_model.js';

env.config();
const mongo_uri = process.env.MONGO_URI || '';

const dbConnect = async () => {
    try {
        var db = await mongoose.connect(mongo_uri);
        console.log(`Connected to ${db.connection.host}`.green.inverse);
    } catch (err) {
        console.error(err).red.inverse;
        process.exit(1);
    }
};

const findAllProducts = async (filter) => await productModel.find(filter);

const findProductById = async (id) => {
    const products = await productModel.find({ _id: id });
    if (products.length < 1) {
        return null;
    }
    return products[0];
};

const saveProduct = async (data) => {
    return await productModel.create(data);
};

const modifyProduct = async (productId, data) => {
    return await productModel.findOneAndUpdate(
        { _id: productId },
        { ...data },
        { new: true }
    );
};

const findUser = async ({ email, id }) => {
    let user;
    if (email) {
        user = await userModel.findOne({ email }).select('-password').exec();
    } else if (id) {
        user = await userModel.findById(id).select('-password').exec();
    } else {
        throw new Error('no information to identify user');
    }
    if (!user) {
        return null;
    } else {
        return user;
    }

    return user;
};

const findAuthorizedUser = async (email, inputPassword) => {
    const user = await userModel.findOne({ email });
    if (user && user.checkPassword(inputPassword)) {
        return await userModel.findOne({ email }).select('-password');
    } else {
        return false;
    }
};

const saveUser = async (name, email, password) => {
    const user = await userModel.create({ name, email, password });
    return user;
};

const modifyUser = async (userId, { name, email, password }) => {
    let payload = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (password) {
        payload.password = await userModel.schema.methods.encryptPassword(
            password
        );
    }
    return await userModel
        .findOneAndUpdate({ _id: userId }, payload, { new: true })
        .select('-password')
        .exec();
};

const findOrders = async (userId) => {
    let orders;
    if (userId) {
        orders = await orderModel.find({ userId });
    } else {
        orders = await orderModel.find();
    }
    return orders;
};

const findOrderById = async (orderId) => {
    const orders = await orderModel.find({ _id: orderId });
    if (orders.length < 1) {
        return null;
    }
    return orders[0];
};

const saveOrder = async (orderData) => {
    const res = await orderModel.create(orderData);
    return res;
};

const modifyOrder = async (
    orderId,
    { isPaid, paidAt, isDelivered, deliveredAt, shippingAddress }
) => {
    let payload = {};
    if (isPaid && paidAt) {
        payload.isPaid = isPaid;
    }
    if (isDelivered && deliveredAt) {
        payload.isDelivered = isDelivered;
        payload.deliveredAt = deliveredAt;
    }
    if (shippingAddress) {
        payload.shippingAddress = shippingAddress;
    }
    const order = await orderModel.updateOne({ _id: orderId }, payload);
    return order.acknowledged;
};

export {
    dbConnect,
    findAllProducts,
    findProductById,
    modifyProduct,
    findUser,
    findAuthorizedUser,
    saveUser,
    modifyUser,
    findOrders,
    findOrderById,
    saveOrder,
    modifyOrder,
    saveProduct,
};
