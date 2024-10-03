require("dotenv").config();

const _config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL,
    jwt_secret: process.env.JWT_SECRET,
    jwt_ttl: process.env.JWT_TTL,
};

const config = Object.freeze(_config);
module.exports = config;
