const server = require("express").Router();
const passport = require("passport");

server.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.send(info).status(503);
    } else {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        res.send("successfully authenticated");
      });
    }
  })(req, res, next);
});

server.get("/logout", (req, res) => {
  req.logOut();
  res.send("successfully logged out");
});

server.get("/me", (req, res) => {
  if (!req.user) {
    return res.send("no user logged in").status(404);
  }
  res.json({ userId: req.user.id });
});

module.exports = server;
