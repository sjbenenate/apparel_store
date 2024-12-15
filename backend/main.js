import express from 'express';
import env from 'dotenv';
import dbConnect from './data/db_interface.js';
import productRouter from './routes/product_routes.js';

env.config();
const port = process.env.PORT || 5000;

dbConnect();

const app = express();
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server was reached on root route.');
});

app.listen(port, () => console.log('Server listening on port: ' + port));
