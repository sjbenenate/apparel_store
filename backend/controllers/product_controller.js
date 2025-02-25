import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findProducts,
    findProductById,
    modifyProduct,
    saveNewProduct,
    removeProduct,
    countProducts,
} from '../data/db_interface.js';

const getProducts = asyncHandler(async (req, res) => {
    console.log('products endpoint hit');
    const activeOnly = req.query?.activeOnly === 'true';
    const pageNumber = Number(req.query?.pageNumber || 1); // start at 0
    const pageCount = Number(req.query?.pageCount || 10); // items per page
    const [searchKey, searchStr] = (req.query?.searchKeyword || ':').split(':');
    const sortKey = req.query?.sortKey;
    const sortDirection = req.query?.sortDirection === 'up' ? 1 : -1;

    console.log(`Search key '${searchKey}', search value '${searchStr}'`);

    const searchExp = new RegExp(searchStr, 'i');

    console.log(`get products: page=${pageNumber} pageCount=${pageCount}`);

    let filter = activeOnly ? { active: true } : {};
    if (searchKey.length > 0) {
        filter[searchKey] = searchExp;
    }

    const products = await findProducts({
        filter,
        sortFilter: sortKey
            ? { [sortKey]: sortDirection }
            : { rating: sortDirection },
        pageNumber,
        pageCount,
    });

    const productCount = await countProducts(filter);

    res.json({ products, productCount });
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

    const payload = {
        userId: req.user._id,
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(brand !== undefined && { brand }),
        ...(category !== undefined && { category }),
        ...(price !== undefined && { price }),
        ...(countInStock !== undefined && { countInStock }),
        ...(image !== undefined && { image }),
    };

    const product = await modifyProduct(productId, payload);

    res.status(201).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    console.log(`Deleting product id ${productId}`);
    const success = await removeProduct(productId);
    if (success) {
        res.status(200).json({ success });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const addProductReview = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    console.log(`Adding review to product id ${productId}`);
    let product = await findProductById(productId);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    const alreadyReviewed = product.reviews.some((review) => {
        console.log(review);
        return req.user._id.equals(review.userId);
    });
    if (alreadyReviewed) {
        res.status(400).json({
            message: 'A review already exists for this user',
        });
        return;
    }

    const review = {
        userId: req.user._id,
        name: req.user.name,
        heading: req.body?.heading,
        comment: req.body?.comment,
        rating: Number(req.body?.rating),
    };

    const allReviews = [...product.reviews, review];
    const reviewsSum = allReviews.reduce(
        (acc, review) => acc + review.rating,
        0
    );

    const result = await modifyProduct(productId, {
        reviews: allReviews,
        rating: reviewsSum / allReviews.length,
    });

    res.status(201).json({ message: 'Review added successfully' });
});

export {
    getProducts,
    getProductById,
    setProductActivate,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
};
