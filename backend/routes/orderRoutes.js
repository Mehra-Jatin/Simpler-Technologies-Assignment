import express from 'express';
import { createOrder , getOrders, verifyPayment } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);
router.get('/get',authMiddleware,getOrders);
export default router;


