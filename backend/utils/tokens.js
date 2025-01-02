import { SignJWT } from 'jose';
import { JWT_COOKIE } from '../constants.js';

const generateToken = async (res, userId) => {
    const expiration_ms =
        process.env.NODE_ENV !== 'development'
            ? 2 * 60 * 60 * 1000
            : 30 * 24 * 60 * 60 * 1000;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(secret);

    res.cookie(JWT_COOKIE, token, {
        httpOnly: true,
        maxAge: expiration_ms,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    });
};

const deleteToken = (res) => {
    res.cookie(JWT_COOKIE, '', {
        httpOnly: true,
        expires: new Date(0),
    });
};

export { generateToken, deleteToken };
