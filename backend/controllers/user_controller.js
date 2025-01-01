import { asyncHandler } from '../middleware/async_handler_middleware.js';
import { findUser, authorizeUser } from '../data/db_interface.js';

const loginUser = asyncHandler(async (req, res) => {
    console.log('authUser endpoint hit');
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (authorizeUser(user, password)) {
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
    res.send('logout user');
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
