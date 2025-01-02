import { asyncHandler } from '../middleware/async_handler_middleware.js';
import { findAuthorizedUser } from '../data/db_interface.js';
import { SignJWT } from 'jose';
import { JWT_COOKIE } from '../constants.js';

const loginUser = asyncHandler(async (req, res) => {
    console.log('authUser endpoint hit');
    const { email, password } = req.body;
    const user = await findAuthorizedUser(email, password);
    if (user) {
        const expiration_ms =
            process.env.NODE_ENV !== 'development'
                ? 2 * 60 * 60 * 1000
                : 30 * 24 * 60 * 60 * 1000;

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: user._id })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('30d')
            .sign(secret);

        res.cookie(JWT_COOKIE, token, {
            httpOnly: true,
            maxAge: expiration_ms,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            accessLevel: user.accessLevel,
        });
    } else {
        res.status(401);
        throw new Error('email or password invalid');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    console.log('registerUser endpoint hit');
    res.send('register user');
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log('logoutUser endpoint hit');
    res.cookie(JWT_COOKIE, '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

const getUserProfile = asyncHandler(async (req, res) => {
    console.log('getUserProfile endpoint hit');
    res.send('getUserProfile');
});

const updateUserProfile = asyncHandler(async (req, res) => {
    console.log('updateUserProfile endpoint hit');
    res.send('updateUserProfile');
});

const getUsers = asyncHandler(async (req, res) => {
    console.log('getUsers endpoint hit');
    res.send('getUsers');
});

const deleteUser = asyncHandler(async (req, res) => {
    console.log('deleteUser endpoint hit');
    res.send('deleteUser');
});

const getUserById = asyncHandler(async (req, res) => {
    console.log('getUserById endpoint hit');
    res.send('getUserById');
});

const updateUser = asyncHandler(async (req, res) => {
    console.log('updateUser endpoint hit');
    res.send('updateUser');
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
