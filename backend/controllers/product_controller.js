import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findAllProducts,
    findProductById,
    modifyProduct,
    saveProduct,
} from '../data/db_interface.js';

const getProducts = asyncHandler(async (req, res) => {
    console.log('products endpoint hit');
    const activeOnly = req.query?.activeOnly === 'true';
    let products = [];
    if (activeOnly) {
        products = await findAllProducts({ active: true });
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

const setProductActivate = asyncHandler(async (req, res) => {
    const id = req.params.productId;
    const active = req.body?.active;
    const product = await modifyProduct(id, { active });
    res.status(201).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
    console.log('create product endpoint hit');

    const { name, description, brand, category, price, countInStock } =
        req.body;

    const product = await saveProduct({
        userId: req.user._id,
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image: '/images/airpods.jpg',
    });

    res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    console.log('update product endpoint hit');
});

export {
    getProducts,
    getProductById,
    setProductActivate,
    createProduct,
    updateProduct,
};
