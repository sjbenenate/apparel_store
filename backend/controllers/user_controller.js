import userModel from '../data/models/user_model.js';
import { asyncHandler } from '../middleware/async_handler_middleware.js';

const authUser = asyncHandler(async (req, res) => {
    console.log('authUser endpoint hit');
    res.send('auth user');
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
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
