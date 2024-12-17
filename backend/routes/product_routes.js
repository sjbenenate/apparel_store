import express from 'express';
import productModel from '../data/models/product_model.js';
import {
    sendError,
    asyncHandler,
} from '../middleware/async_handler_middleware.js';

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
        const id = req.params.productId;
        console.log('Get product route hit for id: ' + id);

        const product = await productModel.find({ _id: id });
        if (product.length < 1) {
            throw new Error(`product could not be found for id: ${id}`);
        } else {
            res.json(product);
        }
    })
);

export default productRouter;
