const sendError = (res, reason) => {
    res.json({
        error: true,
        reason: reason,
    });
};

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
export { sendError, asyncHandler };
