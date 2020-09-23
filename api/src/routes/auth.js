const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "956912825831-q83d2ls0s4gmh092110iva2bpdq0lk79.apps.googleusercontent.com"
);

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

server.post("/remove/:id", (req, res) => {
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
      user.role = "client";
      user
        .save()
        .then(() => {
          res
            .status(200)
            .send("Se le asignó el rol de Usuario al usuario " + id);
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

server.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  // Aplica hash al password antes de guardarla en la db
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({
    fullname,
    email,
    password: hashedPassword,
    role: "client",
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 60 * 60 * 24,
      });
      return res
        .send({
          user: {
            id: user.id,
            fullname,
            email,
            role: user.role,
            address: null,
            doc_number: null,
            phone: null,
          },
          token,
        })
        .status(201);
    })
    .catch((err) => {
      var status = 500;
      console.log(err);
      if (err.name === "SequelizeValidationError") status = 422;
      return res.send({ errors: err.errors, status }).status(status);
    });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email: email },
  }).then(async (user) => {
    if (!user) return res.status(404).send("The email doesn't exists");

    let codeLocal = await codeStorage.getItem(user.id + "");
    if (codeLocal) codeLocal = JSON.parse(codeLocal);
    if (codeLocal && codeLocal.password_reset) {
      codeLocal.password_reset.expired = true;
      await codeStorage.setItem(user.id + "", JSON.stringify(codeLocal));
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (!result) return res.status(401).send({ auth: false, token: null });
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).send({
        user: {
          id: user.id,
          fullname: user.fullname,
          doc_number: user.doc_number,
          phone: user.phone,
          address: user.address,
          role: user.role,
          email: user.email,
        },
        token,
      });
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

server.post("/logout", verifyToken, (req, res) => {
  //res.status(200).send({ auth: false, token: null });
  let item = { id: req.userId, token: req.token, createdAt: Date.now() };
  let blacklist = localStorage.getItem("blacklist");
  blacklist = JSON.parse(blacklist);
  blacklist.push(item);
  localStorage.setItem("blacklist", JSON.stringify(blacklist));
  return res.sendStatus(204);
});

server.post("/password-reset", (req, res) => {
  const { email } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  }).then(async (user) => {
    if (!user) {
      return res.sendStatus(422);
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    if (!codeStorage.getItem(user.id + ""))
      codeStorage.setItem(user.id + "", "{}");
    let userCodes = JSON.parse(codeStorage.getItem(user.id + ""));
    userCodes.password_reset = {
      code,
      expired: false,
      createdAt: Date.now(),
    };
    codeStorage.setItem(user.id + "", JSON.stringify(userCodes));

    let transporter = nodemailer.createTransport({
      host: email_env.host,
      port: email_env.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: email_env.user,
        pass: email_env.password,
      },
    });

    await transporter.sendMail({
      from: '"OriginMaster" <' + email_env.user + ">", // sender address
      to: email, // list of receivers
      subject: "Reestablece tu clave - OriginMaster", // Subject line
      html:
        `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
            <div style="width: 100%; max-width: 700px; margin: auto;">
          <div style="background-color: #3a3a56; text-align: center; padding: 0.7rem 0;">
          <h1 style="color: white; font-family: sans-serif; font-weight: normal;">Origin<span style="color: red;">Master</span></h1>
            
          </div>
            
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;Hola, ` +
        user.fullname +
        `!<br><br>Ingresa el c&oacute;digo y elige una nueva clave para seguir disfrutando de tu cuenta en OriginMaster.<br /><br /> Tu c&oacute;digo es:</p>
          <span style="background-color: #3a3a56; padding: 1rem; color: white; border-radius: 3px; font-size: 1.5rem;">` +
        code +
        `</span></div><br /><br /><br />
            <span style="color: #4f5154; margin-bottom: 1.4rem; font-size: .9rem;">Si no solicitaste reestablecer tu clave ignora este correo.</span><br><br><br>
            <div style="background-color: #cdd0d4; padding: 0.5rem; font-size: .7rem; text-align:justify;">
                Estás recibiendo este correo porque registraste una cuenta en OriginMaster, un sitio ficticio que nunca, bajo ningún concepto, te pedirá datos personales.
             </div>
          </div>
          </div>`, // html body
    });

    return res.sendStatus(200);
  });
});

server.put("/password-reset", (req, res) => {
  const { email, code, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  }).then(async (user) => {
    if (!user) {
      return res.sendStatus(422);
    }
    const codeLocal = JSON.parse(codeStorage.getItem(user.id + ""))
      .password_reset;
    const limitTime = 3600000; //60 minutos.
    if (
      codeLocal.expired === true ||
      Date.now() > codeLocal.createdAt + limitTime ||
      code * 1 !== codeLocal.code
    ) {
      //se excedió del tiempo límite o el código no es el mismo
      return res.sendStatus(401);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.sendStatus(200);
  });
});

server.get("/orders", verifyToken, (req, res) => {
  const { userId } = req;
  Order.findAll({
    limit: 10,
    where: {
      userId: userId,
      status: {
        [Op.ne]: "shopping_cart",
      },
    },
  })
    .then((orders) => {
      return res.send({ data: orders });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.put("/orders/cancel", verifyToken, (req, res) => {
  const { userId } = req;
  const { orderId } = req.body;
  Order.findOne({
    where: {
      id: orderId,
      userId: userId,
    },
  })
    .then(async (order) => {
      if (!order) return res.sendStatus(404);
      if (order.status !== "created") return res.sendStatus(403);
      order.status = "canceled";
      await order.save();
      return res.send({ data: order });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.post("/login-google", (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "956912825831-q83d2ls0s4gmh092110iva2bpdq0lk79.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({
          where: { email: email },
        }).then((user) => {
          if (user) {
            const token = jwt.sign({ id: user.id }, secret, {
              expiresIn: 60 * 60 * 24,
            });
            res.status(200).send({
              user: {
                id: user.id,
                fullname: user.fullname,
                doc_number: user.doc_number,
                phone: user.phone,
                address: user.address,
                role: user.role,
                email: user.email,
              },
              token,
            });
          } else {
            const password = `1A${email}A1`;
            User.create({
              fullname: name,
              email: email,
              password: password,
            }).then((user) => {
              const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 60 * 60 * 24,
              });
              res.status(201).send({
                user: {
                  id: user.id,
                  fullname: user.fullname,
                  email: user.email,
                  role: user.role,
                  address: null,
                  doc_number: null,
                  phone: null,
                },
                token,
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
