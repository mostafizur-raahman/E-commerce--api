const { Router } = require("express");
const userRegister = require("./controllers/user.register");

const userRoutes = new Router();

userRoutes.post("/register", userRegister);

module.exports = userRoutes;
