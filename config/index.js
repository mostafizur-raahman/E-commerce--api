require("dotenv").config();

const _config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL,
};

const config = Object.freeze(_config);
module.exports = config;
