import { asyncHandler } from './async_handler_middleware.js';
import { jwtVerify } from 'jose';
import { findUser } from '../data/db_interface.js';

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

export { authMiddleware };
