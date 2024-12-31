import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/user_controller.js';

let userRouter = express.Router();

export default userRouter;
