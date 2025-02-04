import { asyncHandler } from '../middleware/async_handler_middleware.js';
import { findAllProducts, findProductById } from '../data/db_interface.js';

const getProducts = asyncHandler(async (req, res) => {
    console.log('products endpoint hit');
    const activeOnly =
        req.query?.active?.toLowerCase() === 'true' ||
        req.query?.active === '1';
    let products = [];
    if (activeOnly) {
        products = await findAllProducts({ disabled: false });
    } else {
        products = await findAllProducts();
    }
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.productId;
    console.log('Get product route hit for id: ' + id);

    const product = await findProductById(id);
    if (!product) {
        throw new Error(`product could not be found for id: ${id}`);
    } else {
        res.json(product);
    }
});

export { getProducts, getProductById };
