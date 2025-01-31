import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
    name: { type: String, required: false },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product',
    },
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        orderItems: [orderItemSchema],
        shippingAddress: shippingAddressSchema,
        paymentMethod: {
            type: String,
            required: true,
        },
        /*paymentResult: {
            id: { type: String, required: true },
            status: { type: String },
            email: { type: String },
            updateTime: { type: String },
        },*/
        orderPrice: { type: Number, required: true, default: 0.0 },
        shippingPrice: { type: Number, required: true, default: 0.0 },
        taxPrice: { type: Number, required: true, default: 0.0 },
        totalPrice: { type: Number, required: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        paymentId: { type: String, default: '' },
        paymentDetails: { type: String },
        isDelivered: { type: Boolean, default: false },
        deliveredAddress: shippingAddressSchema,
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
