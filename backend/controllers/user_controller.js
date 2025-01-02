import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findAuthorizedUser,
    saveUser,
    modifyUser,
} from '../data/db_interface.js';
import { generateToken, deleteToken } from '../utils/tokens.js';

const loginUser = asyncHandler(async (req, res) => {
    console.log('authUser endpoint hit');
    const { email, password } = req.body;
    const user = await findAuthorizedUser(email, password);
    if (user) {
        await generateToken(res, user._id);

        res.json(user.json());
    } else {
        res.status(401);
        throw new Error('email or password invalid');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    console.log('registerUser endpoint hit');
    const { name, email, password } = req.body;
    const user = await saveUser(name, email, password);
    await generateToken(res, user._id);
    res.status(201).json(user.json());
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log('logoutUser endpoint hit');
    deleteToken();
    res.status(200).json({ message: 'User logged out' });
});

const getUserProfile = asyncHandler(async (req, res) => {
    console.log('getUserProfile endpoint hit');
    res.status(200).json(req.user.json());
});

const updateUserProfile = asyncHandler(async (req, res) => {
    console.log('updateUserProfile endpoint hit');
    const userId = req.user._id;

    const updatePayload = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
    };

    if (req.body.password) {
        updatePayload.password = req.body.password;
    }

    const user = await modifyUser(userId, updatePayload);
    res.status(200).json(user.json());
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
