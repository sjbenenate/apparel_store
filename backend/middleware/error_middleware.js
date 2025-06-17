const UrlNotFound = (req, res, next) => {
    const error = new Error(`Not Found. url='${req.originalUrl}'`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || err;
    const stack =
        process.env.NODE_ENVIRONMENT !== 'production' ? err.stack : '';

    console.error(message);

    res.status(statusCode).json({ message, stack });
};

export { UrlNotFound, errorHandler };
