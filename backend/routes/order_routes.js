import { Router } from 'express';
import {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    createPayTransaction,
    capturePayTransaction,
    updateOrderToDelivered,
    createUserOrder,
} from '../controllers/order_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';
import { checkObjectId } from '../middleware/check_object_id_middleware.js';
import { ACCESS_LEVELS } from '../constants.js';

let orderRouter = Router();

orderRouter.get('/myOrders', authMiddleware, getOrdersByUser);

orderRouter.post(
    '/:id/payInitiate',
    authMiddleware,
    checkObjectId,
    createPayTransaction
);

orderRouter.post(
    '/:id/payCapture',
    authMiddleware,
    checkObjectId,
    capturePayTransaction
);

orderRouter.put(
    '/:id/deliver',
    authMiddleware,
    adminMiddleware(ACCESS_LEVELS.MAINTAINER),
    checkObjectId,
    updateOrderToDelivered
);
orderRouter.get('/:id', authMiddleware, checkObjectId, getOrderById);
orderRouter
    .route('/')
    .all(authMiddleware)
    .get(adminMiddleware(ACCESS_LEVELS.MAINTAINER), getAllOrders)
    .post(createUserOrder);

export default orderRouter;
