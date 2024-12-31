import express from 'express';
import env from 'dotenv';
import dbConnect from './data/db_interface.js';
import productRouter from './routes/product_routes.js';
import userRouter from './routes/user_routes.js';
import { UrlNotFound, errorHandler } from './middleware/error_middleware.js';

env.config();
const port = process.env.PORT || 5000;

dbConnect();

const app = express();
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use(UrlNotFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Server was reached on root route.');
});

app.listen(port, () => console.log('Server listening on port: ' + port));
