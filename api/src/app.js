const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require("passport");

const cors = require("cors");
const session = require("express-session");

require("./db.js");
require("./passport/local-auth.js");

// Clave para la sesion (cadena de caracteres generada aleatoriamente)
const sessionSecret = "SjU%phqz,G3:ykn";

const server = express();

server.name = "API";

server.use(morgan("dev"));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        credentials: true, // allow session cookie from browser to pass through
    })
);
server.use(
    session({ secret: sessionSecret, resave: true, saveUninitialized: true })
);
server.use(cookieParser(sessionSecret));
server.use(passport.initialize());
server.use(passport.session());

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
