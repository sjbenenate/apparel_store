import express from 'express';
import {
    getProducts,
    getProductById,
    setProductActivate,
    createProduct,
    updateProduct,
} from '../controllers/product_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';
import { ACCESS_LEVELS } from '../constants.js';

let productRouter = express.Router();

productRouter.put(
    '/:productId/activate',
    authMiddleware,
    adminMiddleware(ACCESS_LEVELS.MAINTAINER),
    setProductActivate
);

productRouter
    .route('/:productId')
    .get(getProductById)
    .put(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        updateProduct
    );

productRouter
    .route('/')
    .get(getProducts)
    .post(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        createProduct
    );

export default productRouter;
