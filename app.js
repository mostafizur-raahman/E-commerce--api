const express = require("express");
const http = require("http");
const app = express();

// middleware
app.use(express.json());

const server = http.createServer(app);

module.exports = server;
