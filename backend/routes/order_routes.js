import { Router } from 'express';
import {
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    payOrderWithPayPal,
    updateOrderToDelivered,
    addToOrder,
} from '../controllers/order_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';

let orderRouter = Router();

orderRouter.get('/myOrders', authMiddleware, getOrdersByUser);

orderRouter.post('/:id/pay', authMiddleware, payOrderWithPayPal);

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
