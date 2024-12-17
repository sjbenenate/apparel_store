const UrlNotFound = (req, res, next) => {
    const error = new Error(`Not Found. url='${req.originalUrl}'`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.kind === 'ObjectId' && err.name === 'CastError') {
        statusCode = 404;
        message = `Resource not found in database`;
    }

    console.error(message);

    res.statusCode = statusCode;
    res.send(message);

    //next(err);
};

export { UrlNotFound, errorHandler };
