const { Router } = require("express");
const { Product } = require("../db.js");
const Sequelize = require("sequelize");

// import all routers;

const productRouter = require("./product.js");
const categoriesRouter = require("./categories.js");
const ordersRouter = require("./orders.js");
const usersRouter = require("./users.js");
const authRouter = require("./auth.js");
const { route } = require("./product.js");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
