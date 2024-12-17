import express from 'express';
import {
    getProducts,
    getProductById,
} from '../controllers/product_controller.js';

let productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.get('/:productId', getProductById);

export default productRouter;
