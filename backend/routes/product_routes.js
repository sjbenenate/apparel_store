import express from 'express';
import productModel from '../data/models/product_model.js';
import { sendError } from './request_utils.js';

let productRouter = express.Router();

productRouter.get('/', (req, res) => {
    console.log('products endpoint hit');
    productModel.find({}).then((products) => res.json(products));
});

productRouter.get('/:productId', (req, res) => {
    console.log('Get product route hit for id: ' + req.params.productId);

    try {
        // search for product
        //   const product = products.find((p) => p._id === req.params.productId);
        // send product
        //res.json(product);
    } catch (err) {
        console.error(err);
        sendError(res, 'product not found');
    }
});

export default productRouter;
