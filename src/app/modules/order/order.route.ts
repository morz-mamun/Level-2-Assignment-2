import { Router } from 'express';
import { OrderControllers } from './order.controller';
const { createOrder, getAllOrders } = OrderControllers;

const router = Router();

// router.get('/', getAllOrdersByUserEmail);
router.get('/', getAllOrders);
router.post('/create-order', createOrder);

export const OrderRoutes = router;
