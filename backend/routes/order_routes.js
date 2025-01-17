import { Router } from 'express';
import {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    updateOrderToPayed,
    updateOrderToDelivered,
    addToOrder,
} from '../controllers/order_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';

let orderRouter = Router();

orderRouter.get('/myOrders', authMiddleware, getOrdersByUser);

orderRouter.put(
    '/:id/pay',
    authMiddleware,
    adminMiddleware,
    updateOrderToPayed
);

orderRouter.put(
    '/:id/deliver',
    authMiddleware,
    adminMiddleware,
    updateOrderToDelivered
);
orderRouter.get('/:id', authMiddleware, getOrderById);
orderRouter
    .route('/')
    .all(authMiddleware)
    .get(adminMiddleware, getAllOrders)
    .post(addToOrder);

export default orderRouter;
