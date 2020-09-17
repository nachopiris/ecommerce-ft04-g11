const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../jwt/verifyToken.js");

const secret = process.env.SECRET;

const { User } = require("../db.js");

server.post("/promote/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(id * 1)) {
    return res.status(400).send({
      errors: [{ message: "La consulta no es válida" }],
      status: 400,
    });
  }
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          errors: [{ message: "No existe el usuario " + id }],
          status: 404,
        });
      }
      user.role = "admin";
      user
        .save()
        .then(() => {
          res
            .status(200)
            .send("Se le asignó el rol de Administrador al usuario " + id);
        })
        .catch((err) => {
          res.status(500).send({
            errors: [
              {
                message:
                  "Ha ocurrido un error al intentar contactar con el servidor",
              },
            ],
            status: 500,
          });
        });
    })
    .catch(() => {
      res.status(500).send({
        errors: [
          {
            message:
              "Ha ocurrido un error al intentar contactar con el servidor",
          },
        ],
        status: 500,
      });
    });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email: email },
  }).then((user) => {
    if (!user) return res.status(404).send("The email doesn't exists");
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (!result) return res.status(401).send({ auth: false, token: null });
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({ auth: true, token });
    });
  });
});

server.get("/me", verifyToken, (req, res) => {
  User.findByPk(req.userId, { attributes: { exclude: ["password"] } }).then(
    (user) => {
      if (!user) return res.status(404).send("No user found.");
      res.status(200).json(user);
    }
  );
});

server.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = server;
