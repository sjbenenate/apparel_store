import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        accessLevel: { type: Number, required: true, default: 0 }, // 5 for admin, 2 for maintainer, 0 for general user
    },
    {
        timestamps: true,
    }
);

export default userModel = mongoose.model('User', userSchema);
