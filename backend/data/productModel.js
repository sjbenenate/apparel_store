import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        heading: { type: String },
        comment: { type: String },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true, default: 0 },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
