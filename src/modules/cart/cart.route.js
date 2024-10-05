const { Router } = require("express");
const createCart = require("./controllers/cart.create");
const authMiddleware = require("../middleware/auth");
const readCart = require("./controllers/cart.read");

const cartRoutes = new Router();

cartRoutes.post("/create", authMiddleware, createCart);
cartRoutes.get("/", authMiddleware, readCart);

module.exports = cartRoutes;
