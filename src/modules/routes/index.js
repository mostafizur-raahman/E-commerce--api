const { Router } = require("express");
const userRoutes = require("../user/user.route");
const productRoutes = require("../product/product.route");

const router = new Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
