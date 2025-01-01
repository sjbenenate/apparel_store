import env from 'dotenv';
import mongoose from 'mongoose';
import dbConnect from '../db_interface.js';
import orderModel from '../models/order_model.js';
import userModel, { ACCESS_LEVELS } from '../models/user_model.js';
import productModel from '../models/product_model.js';
import products from './products_seed.js';
import users from './users_seed.js';
import colors from 'colors';

// Function Definitions

const deleteAll = async () => {
    try {
        await productModel.deleteMany({});
        await userModel.deleteMany({});
        await orderModel.deleteMany({});
    } catch (err) {
        throw err;
    }
};

const seedData = async () => {
    try {
        await deleteAll();
        const createdUsers = await userModel.insertMany(users);
        const adminUsers = createdUsers.find(
            (user) => user.accessLevel === ACCESS_LEVELS.ADMIN
        );
        const adminUserId = adminUsers._id;
        console.log(`Found admin user id ${adminUserId}`);
        const productsWithUser = products.map((p) => {
            return { ...p, userId: adminUserId };
        });
        const createdProducts = await productModel.insertMany(productsWithUser);
        console.log('Products sent to database'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
};

const clearData = async () => {
    try {
        await deleteAll();
        console.log('Data has been cleared'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
};

// Main run code

env.config();

dbConnect();

if (process.argv.find((arg) => arg === '--clear')) {
    await clearData();
} else {
    await seedData();
}
