import express from 'express';
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/user_controller.js';
import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';

let userRouter = express.Router();

userRouter
    .route('/')
    .post(registerUser)
    .get(authMiddleware, adminMiddleware, getUsers);

userRouter.post('/login', loginUser);
userRouter.post('/logout', authMiddleware, logoutUser);

userRouter
    .route('/profile')
    .all(authMiddleware)
    .get(getUserProfile)
    .put(updateUserProfile);

userRouter
    .route('/:id')
    .all(authMiddleware, adminMiddleware)
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default userRouter;
