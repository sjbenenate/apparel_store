import productModel from '../data/models/product_model.js';
import { asyncHandler } from '../middleware/async_handler_middleware.js';

const getProducts = asyncHandler(async (req, res) => {
    console.log('products endpoint hit');
    const products = await productModel.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.productId;
    console.log('Get product route hit for id: ' + id);

    const product = await productModel.find({ _id: id });
    if (product.length < 1) {
        throw new Error(`product could not be found for id: ${id}`);
    } else {
        res.json(product[0]);
    }
});

export { getProducts, getProductById };
