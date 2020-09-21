const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");

localStorage = new LocalStorage("./blacklistJWT");
codeStorage = new LocalStorage("./codeStorage");

const verifyToken = require("../jwt/verifyToken.js");
const secret = process.env.SECRET;
const email_env = {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT
}

const { User, Order } = require("../db.js");

server.post("/", verifyToken, (req, res) => {
    const {token, address, phone, doc_number} = req.body;
    const {userId} = req;
    User.findByPk(userId)
    .then(async (user) => {
        console.log(user);
        if(!user) return res.sendStatus(401);
        user.address = address;
        user.phone = phone;
        user.doc_number = doc_number;
        await user.save();
        Order.findOne({
            where:{
                userId: userId,
                status: 'shopping_cart'
            }
        })
        .then(async order => {
            order.status = 'created';
            await order.save();
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        })
    })
    .catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
});


module.exports = server;
