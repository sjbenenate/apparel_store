const sendError = (res, reason) => {
    res.json({
        error: true,
        reason: reason,
    });
};

export { sendError };
