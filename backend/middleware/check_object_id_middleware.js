import { isValidObjectId } from 'mongoose';

const checkObjectId = (req, res, next) => {
    const id =
        req.params?.id ||
        req.params?.productId ||
        req.params?.userId ||
        req.params?.orderId;

    if (!isValidObjectId(id)) {
        res.status(404);
        throw new Error(`Invalid ObjectId: ${id}`);
    } else {
        next();
    }
};

export { checkObjectId };
