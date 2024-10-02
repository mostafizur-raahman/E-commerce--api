const express = require("express");
const http = require("http");
const morgan = require("morgan");
const router = require("./src/modules/routes");
const globalErrorHandler = require("./src/modules/middleware/globalError");
const Fault = require("./src/modules/middleware/Fault");
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

const server = http.createServer(app);

app.use("/api/v1", router);

app.use(globalErrorHandler);
//routes
module.exports = server;
