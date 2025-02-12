import path from 'path';
import express from 'express';
import multer from 'multer';

import {
    authMiddleware,
    adminMiddleware,
} from '../middleware/user_auth_middleware.js';
import { ACCESS_LEVELS } from '../constants.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `/uploads/`);
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

let uploadRouter = express.Router();

uploadRouter.post(
    '/products/image',
    authMiddleware,
    adminMiddleware(ACCESS_LEVELS.MAINTAINER),
    upload.single('product-image'),
    (req, res) => {
        res.json({
            message: `File has been uploaded`,
            imageUrl: req.file.path,
        });
    }
);

export default uploadRouter;
