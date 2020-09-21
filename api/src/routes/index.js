const { Router } = require("express");
const { Product } = require("../db.js");
const Sequelize = require("sequelize");

// import all routers;

const productRouter = require('./product.js');
const categoriesRouter = require('./categories.js');
const checkoutRouter = require('./checkout.js');
const ordersRouter = require('./orders.js');
const usersRouter = require('./users.js');
const authRouter = require('./auth.js');

const { route } = require('./product.js');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoriesRouter);
router.use('/checkout', checkoutRouter);
router.use('/orders', ordersRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
