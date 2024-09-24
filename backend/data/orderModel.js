import mongoose from 'mongoose';

const shippingShema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [shippingShema],
  },
  {
    timestamps: true,
  },
);

export default orderSchema = mongoose.model('Order', orderSchema);
