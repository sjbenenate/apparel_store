import { asyncHandler } from './async_handler_middleware.js';
import { jwtVerify } from 'jose';
import { findUser } from '../data/db_interface.js';
import { ACCESS_LEVELS } from '../data/models/user_model.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            req.user = await findUser({ id: payload.userId });
            next();
        } catch (err) {
            throw new Error('Auth token invalid');
        }
    } else {
        throw new Error('No auth token');
    }
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new Error('no user for admin middleware to verify!');
    }

    if (req.user.accessLevel !== ACCESS_LEVELS.ADMIN) {
        throw new Error('Access not allowed for this user');
    }

    next();
});

export { authMiddleware, adminMiddleware };
