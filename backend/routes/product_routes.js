import express from 'express';
import {
    getProducts,
    getProductById,
    setProductActivate,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
} from '../controllers/product_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';
import { checkObjectId } from '../middleware/check_object_id_middleware.js';
import { ACCESS_LEVELS } from '../constants.js';

let productRouter = express.Router();

productRouter.put(
    '/:productId/activate',
    authMiddleware,
    adminMiddleware(ACCESS_LEVELS.MAINTAINER),
    checkObjectId,
    setProductActivate
);

productRouter.post(
    '/:productId/review',
    checkObjectId,
    authMiddleware,
    addProductReview
);

productRouter
    .route('/:productId')
    .get(checkObjectId, getProductById)
    .put(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        checkObjectId,
        updateProduct
    )
    .delete(
        authMiddleware,
        adminMiddleware(ACCESS_LEVELS.MAINTAINER),
        checkObjectId,
        deleteProduct
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
