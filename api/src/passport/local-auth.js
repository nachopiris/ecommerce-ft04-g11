
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../db.js");

// Estrategia

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({
    where: { id: userId },
  }).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({
        where: { email: email },
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              throw err;
            }
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect Password" });
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({
    where: { id: userId },
  }).then((user) => {
    done(null, user.id);
  });
});

module.exports = passport;
