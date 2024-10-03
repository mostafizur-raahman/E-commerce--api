const { Router } = require("express");
const createProduct = require("./controllers/product.create");
const read = require("./controllers/product.read");

const productRoutes = new Router();

productRoutes.post("/create", createProduct);
productRoutes.get("/", read);

module.exports = productRoutes;
