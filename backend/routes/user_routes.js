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

let userRouter = express.Router();

userRouter.route('/').post(registerUser).get(getUsers);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

userRouter.route('/profile').get(getUserProfile).put(updateUserProfile);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default userRouter;
