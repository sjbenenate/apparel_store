import express from 'express';
import env from 'dotenv';
import products from './data/products_seed.js';
import dbConnect from './data/db_interface.js';

env.config();
const port = process.env.PORT || 5000;

dbConnect();

const sendError = (res, reason) => {
    res.json({
        error: true,
        reason: reason,
    });
};

const app = express();

app.get('/', (req, res) => {
    res.send('Server was reached on root route.');
});

app.get('/api/products', (req, res) => {
    console.log('products endpoint hit');
    res.json(products);
});

app.get('/api/product/:productId', (req, res) => {
    console.log('Get product route hit for id: ' + req.params.productId);

    try {
        // search for product
        //   const product = products.find((p) => p._id === req.params.productId);
        // send product
        //res.json(product);
    } catch (err) {
        console.error(err);
        sendError(res, 'product not found');
    }
});

app.listen(port, () => console.log('Server listening on port: ' + port));
