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
        cb(null, path.resolve('./uploads/'));
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const checkFileType = (req, file, cb) => {
    const approvedTypes = /jpg|JPG|jpeg|JPEG|png|PNG/;
    const fileType = path.extname(file.originalname);
    const approved = approvedTypes.test(fileType);
    if (!approved) {
        cb('Only png or jpeg files allowed at this time');
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage, fileFilter: checkFileType });

let uploadRouter = express.Router();

uploadRouter.post(
    '/products/image',
    authMiddleware,
    adminMiddleware(ACCESS_LEVELS.MAINTAINER),
    upload.single('product-image'),
    (req, res) => {
        res.json({
            message: `File has been uploaded`,
            imageUrl: `\\uploads\\${req.file.filename}`,
        });
    }
);

export default uploadRouter;
