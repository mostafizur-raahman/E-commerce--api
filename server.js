const server = require("./app");
const config = require("./config");
const { dbConnect } = require("./config/db");

// connect mongodb
dbConnect();

server.listen(config.port, () => {
    console.debug(`App running on port ${config.port}`);
});
