import env from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

import userModel from './models/user_model.js';
import productModel from './models/product_model.js';

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

const findAllProducts = async () => await productModel.find({});

const findProductById = async (id) => {
    const products = await productModel.find({ _id: id });
    if (products.length < 1) {
        return null;
    }
    return products[0];
};

export { dbConnect, findAllProducts, findProductById };
