const server = require("express").Router();
const passport = require("passport");

// ruta de login, devuelve el id del usuario logeado

server.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.send("Contrasena incorrecta o usuario inexistente");
    } else {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        res.send({ userId: req.user.id });
      });
    }
  })(req, res, next);
});

module.exports = server;
