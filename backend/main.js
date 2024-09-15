import express from 'express';
import env from 'dotenv';
import products from './data/products.js';

env.config();
const port = process.env.PORT || 5000;

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
  const product = products.find((p) => p._id === req.params.productId);
  if (!product) {
    sendError(res, 'product not found');
  } else {
    res.json(product);
  }
});

app.listen(port, () => console.log('Server listening on port: ' + port));
