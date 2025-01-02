import express from 'express';
import env from 'dotenv';
import { dbConnect } from './data/db_interface.js';
import productRouter from './routes/product_routes.js';
import userRouter from './routes/user_routes.js';
import { UrlNotFound, errorHandler } from './middleware/error_middleware.js';
import cookieParser from 'cookie-parser';

// Environment and database config
env.config();
const port = process.env.PORT || 5000;

dbConnect();

// Create the App
const app = express();

// Body and cookie parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Server was reached on root route.');
});

// Error Middleware
app.use(UrlNotFound);
app.use(errorHandler);

// Launch the App
app.listen(port, () => console.log('Server listening on port: ' + port));
