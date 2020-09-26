const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");
const mercadopago = require("mercadopago");

localStorage = new LocalStorage("./blacklistJWT");
codeStorage = new LocalStorage("./codeStorage");

const verifyToken = require("../jwt/verifyToken.js");
const secret = process.env.SECRET;
const email_env = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
};

const { User, Order } = require("../db.js");

mercadopago.configure({
  access_token:
    "APP_USR-6598461348116788-092518-7155868d5ab76566022e9a4fc6413bf0-651261130",
});

server.post("/", verifyToken, (req, res) => {
  const { token, address, phone, doc_number } = req.body;
  const { userId } = req;
  User.findByPk(userId)
    .then(async (user) => {
      if (!user) return res.sendStatus(401);
      user.address = address;
      user.phone = phone;
      user.doc_number = doc_number;
      await user.save();
      Order.findOne({
        where: {
          userId: userId,
          status: "shopping_cart",
        },
      })
        .then(async (order) => {
          order.status = "created";
          await order.save();
          return res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.post("/payment", verifyToken, async (req, res) => {
  const { products } = req.body;
  const userId = req.userId;

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) return res.sendStatus(422);

  const items = products.map((product) => {
    return {
      id: product.id,
      currency_id: "ARS",
      title: product.name,
      quantity: product.quantity,
      unit_price: parseFloat(product.price),
    };
  });

  const payer = {
    name: user.fullname.split(" ")[0],
    surname: user.fullname.split(" ").slice(1).join(" "),
    email: user.email,
    phone: {
      area_code: "",
      number: parseInt(user.phone),
    },
    identification: {
      type: "DNI",
      number: user.doc_number,
    },
    address: {
      zip_code: "",
      street_name: user.address,
      street_number: 0,
    },
  };

  let preference = {
    items: items,
    payer,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      res.send(response.body.init_point).status(200);
    })
    .catch(function (error) {
      res.send(error).status(500);
    });
});

module.exports = server;
