import { asyncHandler } from './async_handler_middleware.js';
import { jwtVerify } from 'jose';
import { findUser } from '../data/db_interface.js';
import { ACCESS_LEVELS } from '../constants.js';
import { JWT_COOKIE } from '../constants.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token = req.cookies[JWT_COOKIE];

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
        res.status(409);
        throw new Error('No user logged in');
    }
});

const adminMiddleware = (accessLevel) =>
    asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new Error('no user for admin middleware to verify!');
        }

        if (req.user.accessLevel < accessLevel) {
            throw new Error('Access not allowed for this user');
        }

        next();
    });

export { authMiddleware, adminMiddleware };
