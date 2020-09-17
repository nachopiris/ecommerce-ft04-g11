const server = require("express").Router();
const passport = require("passport");

// ruta de login, devuelve el id del usuario logeado

server.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            throw err;
        }
            
        if (!user) {
            res.send({errors:[{message:"Las credenciales no coinciden con nuestros registros"}], status:401}).status(401);
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    throw err;
                }
                const {
                    id,
                    fullname,
                    email,
                    address,
                    dni,
                    phone,
                    role,
                } = req.user;
                res.send({
                    user: { id, fullname, email, address, dni, phone, role },
                });
            });
        }
    })(req, res, next);
});

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
            user.save()
                .then(() => {
                    res.status(200).send(
                        "Se le asignó el rol de Administrador al usuario " + id
                    );
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
const { User } = require("../db.js");

server.post("/promote/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(id * 1)) {
    return res
      .status(400)
      .send({ errors: [{ message: "La consulta no es válida" }], status: 400 });
  }
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({
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
          res
            .status(500)
            .send({
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
      res
        .status(500)
        .send({
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
