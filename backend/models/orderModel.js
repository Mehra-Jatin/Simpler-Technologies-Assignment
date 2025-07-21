import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
   items: {
     type: String,
     required: true,
   },
    totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  paymentId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;


//  items: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Item', 
//       required: true,
//     }
//   ]    this should be used if you have a separate Item model but in this case, we are passing id of dummy items from frontend