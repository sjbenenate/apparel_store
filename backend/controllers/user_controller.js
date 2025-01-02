import { asyncHandler } from '../middleware/async_handler_middleware.js';
import { findAuthorizedUser, saveUser } from '../data/db_interface.js';
import { generateToken, deleteToken } from '../utils/tokens.js';
import { JWT_COOKIE } from '../constants.js';

const loginUser = asyncHandler(async (req, res) => {
    console.log('authUser endpoint hit');
    const { email, password } = req.body;
    const user = await findAuthorizedUser(email, password);
    if (user) {
        await generateToken(res, user._id);

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
    const { name, email, password } = req.body;
    const userId = await saveUser(name, email, password);
    await generateToken(res, userId);
    res.send(`registered user '${name}'`);
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log('logoutUser endpoint hit');
    deleteToken();
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
