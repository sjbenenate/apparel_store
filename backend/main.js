import express from 'express';
import env from 'dotenv';
import path from 'path';
import { dbConnect } from './data/db_interface.js';
import productRouter from './routes/product_routes.js';
import userRouter from './routes/user_routes.js';
import orderRouter from './routes/order_routes.js';
import uploadRouter from './routes/upload_routes.js';
import { UrlNotFound, errorHandler } from './middleware/error_middleware.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/user_auth_middleware.js';

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
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter);

app.get('/api/config/paypal', authMiddleware, async (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Static storage
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    console.log('launching production');
    app.use(express.static(path.join(__dirname, 'ui', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'ui', 'build', 'index.html'));
    });
} else {
    console.log('launching development');
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

// Error Middleware
app.use(UrlNotFound);
app.use(errorHandler);

// Launch the App
app.listen(port, () => console.log('Server listening on port: ' + port));
