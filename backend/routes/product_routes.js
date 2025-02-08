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

productRouter.get('/:productId', getProductById);

productRouter
    .route('/')
    .get(getProducts)
    .put(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        createProduct
    );
/*.post(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        updateProduct
    );*/

export default productRouter;
