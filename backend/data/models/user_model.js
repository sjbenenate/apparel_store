import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ACCESS_LEVELS } from '../../constants.js';

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

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
