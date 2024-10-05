const jwt = require("jsonwebtoken");
const Fault = require("../middleware/Fault");
const config = require("../../../config");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization || req.headers.Authorization;

        if (!token) {
            throw new Fault("No token provided", 401);
        }

        // Verify the token
        const decoded = jwt.verify(token, config.jwt_secret);

        req.user = decoded;

        next();
    } catch (error) {
        next(new Fault("Authentication failed", 401));
    }
};

module.exports = authMiddleware;
