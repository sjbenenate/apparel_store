import mongoose from 'mongoose';

export const ACCESS_LEVELS = {
    ADMIN: 5,
    MAINTAINER: 2,
    BASIC: 0,
};

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        accessLevel: {
            type: Number,
            required: true,
            default: ACCESS_LEVELS.BASIC,
        }, // 5 for admin, 2 for maintainer, 0 for general user
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
