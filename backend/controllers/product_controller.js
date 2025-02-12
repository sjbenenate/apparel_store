import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findAllProducts,
    findProductById,
    modifyProduct,
    saveNewProduct,
    removeProduct,
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

    const { name, description, brand, category, price, countInStock, image } =
        req.body;

    const product = await saveNewProduct({
        userId: req.user._id,
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image,
    });

    res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    console.log('update product endpoint hit');
    const productId = req.params.productId;

    const { name, description, brand, category, price, countInStock, image } =
        req.body;

    const product = await modifyProduct(productId, {
        userId: req.user._id,
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image,
    });

    res.status(201).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    console.log(`Deleting product id ${productId}`);
    const success = await removeProduct(productId);
    if (success) {
        res.status(200);
    } else {
        res.status(404);
    }
});

export {
    getProducts,
    getProductById,
    setProductActivate,
    createProduct,
    updateProduct,
    deleteProduct,
};
