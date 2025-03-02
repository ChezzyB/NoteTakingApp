const jwt = require("jsonwebtoken");

//Check if this user has a valid token to allow access
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    //If there is no valid token then access must be denied
    if (!token) {
        const error = new Error("Unauthorized: No token provided");
        error.statuscode = 401;
        return next(error);
    }
    //If the token is present it must be compared to the .env token for validity
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        error.message = "Invalid token";
        error.statuscode = 403;
        return next(error);
    }
};

// Middleware for logging requests
const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

//Error handling
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    //Error logs for debugging
    console.error(`[Error] ${status} - ${message}`);

    //Inform client side of the error
    res.status(status).json({status, message});
};

module.exports = {isAuthenticated, logRequests, errorHandler};
