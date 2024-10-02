const { Router } = require("express");
const userRoutes = require("../user/user.route");

const router = new Router();

router.use("/users", userRoutes);

module.exports = router;
