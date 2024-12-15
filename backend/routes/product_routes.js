import express from 'express';
import productModel from '../data/models/product_model.js';
import { sendError, asyncHandler } from './request_utils.js';

let productRouter = express.Router();

productRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        console.log('products endpoint hit');
        const products = await productModel.find({});
        res.json(products);
    })
);

productRouter.get(
    '/:productId',
    asyncHandler(async (req, res) => {
        console.log('Get product route hit for id: ' + req.params.productId);

        const product = await productModel.find({ _id: req.params.productId });
        if (product.length < 1) {
            console.error('product could not be found');
            sendError(res, 'product could not be found');
        } else {
            res.json(product);
        }
    })
);

export default productRouter;
