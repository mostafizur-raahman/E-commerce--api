const { Router } = require("express");
const createProduct = require("./controllers/product.create");
const read = require("./controllers/product.read");
const deleteProdut = require("./controllers/product.delete");

const productRoutes = new Router();

productRoutes.post("/create", createProduct);
productRoutes.get("/", read);
productRoutes.patch("/", deleteProdut);

module.exports = productRoutes;
