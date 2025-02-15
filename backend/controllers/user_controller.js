import { asyncHandler } from '../middleware/async_handler_middleware.js';
import {
    findAuthorizedUser,
    findUser,
    saveUser,
    modifyUser,
    removeUser,
    findAllUsers,
    countUsers,
} from '../data/db_interface.js';
import { generateToken, deleteToken } from '../utils/tokens.js';
import { ACCESS_LEVELS } from '../constants.js';

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
    const existingUser = await findUser({ email });
    if (existingUser) {
        res.status(409);
        throw new Error('User already exists with this email.');
    }
    const user = await saveUser(name, email, password);
    await generateToken(res, user._id);
    res.status(201).json(user.json());
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log('logoutUser endpoint hit');
    deleteToken(res);
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
    const pageNumber = Number(req.query?.pageNumber || 1); // start at 0
    const pageCount = Number(req.query?.pageCount || 10); // items per page
    console.log(`get users: page=${pageNumber} pageCount=${pageCount}`);

    const users = await findAllUsers({
        pageNumber,
        pageCount,
    });

    const userCount = await countUsers();

    res.status(200).json({ users, userCount });
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(`delete user ${userId}`);
    const user = await findUser({ id: userId });
    if (user.accessLevel >= ACCESS_LEVELS.ADMIN) {
        res.status(400).json({
            success: false,
            message: 'Admin level users cannot be deleted',
        });
    } else if (!user) {
        res.status(404).json({ success: false, message: 'User was not found' });
    } else {
        const success = await removeUser(userId);
        res.status(200).json({ success });
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(`get user by id ${userId}`);
    const user = await findUser({ id: userId });
    if (!user) {
        res.status(404).json({ message: 'User was not found' });
    } else {
        res.status(200).json(user);
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(`update user ${userId}`);
    const user = await findUser({ id: userId });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const newUser = await modifyUser(userId, {
            name: req.body?.name || user.name,
            email: req.body?.email || user.email,
            accessLevel: req.body?.accessLevel || user.accessLevel,
        });
        res.status(201).json(newUser);
    }
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
    updateUserById,
};
