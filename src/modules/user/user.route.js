const { Router } = require("express");
const userRegister = require("./controllers/user.register");
const login = require("./controllers/user.login");

const userRoutes = new Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", login);

module.exports = userRoutes;
