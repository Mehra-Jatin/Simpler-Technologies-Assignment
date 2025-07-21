
import crypto from 'crypto';
import Order from '../models/orderModel.js';
import { razorpay } from '../utils/pay.js';


export const createOrder = async (req, res) => {
    const userId = req.user.id; 
  try {
    const { amount, items} = req.body;

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
    });

    // Create order in your DB
    const newOrder = await Order.create({
      user: userId,
      items,
      totalAmount: amount,
      paymentStatus: 'Failed',
      OrderId: razorpayOrder.id,
    });

    res.status(200).json({
      razorpayOrderId: razorpayOrder.id,
      orderId: newOrder._id,
      amount: amount * 100,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Order creation failed' });
  }
};



export const verifyPayment = async (req, res) => {
  try{
    const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    orderId, 
  } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  const isValid = generatedSignature === razorpaySignature;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (isValid) {
    order.paymentStatus = 'Paid';
    order.paymentId = razorpayPaymentId;
    await order.save();
    return res.status(200).json({ success: true });
  } else {
    order.paymentStatus = 'Failed';
    await order.save();
    return res.status(400).json({ success: false });
  }
  }
  catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; 
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
