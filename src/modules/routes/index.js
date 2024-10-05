const { Router } = require("express");
const userRoutes = require("../user/user.route");
const productRoutes = require("../product/product.route");
const cartRoutes = require("../cart/cart.route");

const router = new Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);

module.exports = router;
