const server = require("express").Router();
const { User, Order, Product, Orderline, Review } = require("../db.js");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const verifyToken = require("../jwt/verifyToken.js");
const Op = Sequelize.Op;

server.get("/", (req, res) => {
  User.findAll({
    order: [["id", "ASC"]],
    attributes: [
      "id",
      "fullname",
      "email",
      "role",
      "address",
      "doc_number",
      "phone",
      "createdAt",
      "updatedAt",
    ],
  })
    .then((users) => {
      return res.send({ data: users });
    })
    .catch((err) => {
      var status = 500;
      return res.send({ errors: err.errors, status }).status(status);
    });
});

server.post("/", async (req, res) => {
  const {
    fullname,
    email,
    password,
    role,
    address,
    doc_number,
    phone,
  } = req.body;

  // Aplica hash al password antes de guardarla en la db
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({
    fullname,
    email,
    password: hashedPassword,
    role,
    address,
    doc_number,
    phone,
  })
    .then((user) => {
      return res
        .send({
          data: {
            id: user.id,
            fullname,
            email,
            role,
            address,
            doc_number,
            phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
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

server.get("/:id/orders", (req, res) => {
  const id = req.params.id;

  if (!Number.isInteger(id * 1)) {
    //multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
    return res
      .send({
        errors: [{ message: "La id del usuario no es valida." }],
        status: 422,
      })
      .status(422);
  }

  User.findByPk(id, {
    include: {
      model: Order,
      through: { attributes: ["price", "quantity"] },
    },
  })
    .then((user) => {
      return res.send({ data: user.orders }).status(200);
    })
    .catch((err) => {
      var status = 500;
      if (err.name === "SequelizeEagerLoadingError") {
        return res.send({ data: [] }).status(204);
      }
      return res.send({ errors: err, status }).status(status);
    });
});

server.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {
    fullname,
    email,
    password,
    role,
    address,
    doc_number,
    phone,
  } = req.body;

  if (!Number.isInteger(id * 1)) {
    //multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
    return res
      .send({
        errors: [{ message: "La id del usuario no es valida." }],
        status: 422,
      })
      .status(422);
  }

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res
          .send({
            errors: [{ message: "Usuario no encontrado" }],
            status: 404,
          })
          .status(404);
      }
      let emailChanged = user.email !== email ? true : false;
      if (emailChanged) user.email = email;
      user.fullname = fullname;
      if (password) user.password = password;
      user.role = role;
      user.address = address;
      user.doc_number = doc_number;
      user.phone = phone;
      user
        .save()
        .then(() => {
          let data = {
            id: user.id,
            fullname,
            role,
            email,
            address,
            doc_number,
            phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
          return res
            .send({
              data,
            })
            .status(200);
        })
        .catch((err) => {
          var status = 500;
          if (err.name === "SequelizeValidationError") status = 422;
          return res.send({ errors: err.errors, status }).status(status);
        });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//******************* RUTA PARA AGREGAR ITEMS AL CARRITO ***************************/
//*********** ademas controla el stock existente del producto **********************/
server.post("/:idUser/cart", (req, res) => {
  const idUser = req.params.idUser;
  const { idProduct, quantityProduct } = req.body;

  Order.findOne({
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  }).then((order) => {
    if (!order) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }
    let orderId = order.id;

    Product.findOne({
      where: {
        id: idProduct,
      },
    }).then((product) => {
      let stock = product.stock;

      if (quantityProduct > stock) {
        res.send("La cantidad pedida supera el stock existente");
        return;
      }

      Orderline.create({
        price: product.price,
        quantity: quantityProduct,
        productId: idProduct,
        orderId: orderId,
        userId: idUser,
      })
        .then((orderCreated) => {
          return res.send(orderCreated).sendStatus(201);
        })
        .catch((err) => {
          var status = 500;
          return res
            .send("Este producto ya fue agregado a la orden")
            .status(status);
        });
    });
  });
});

server.get("/orders", verifyToken, (req, res) => {
  const idUser = req.userId;
  Order.findAll({
    include: [User, { model: Product, through: Orderline }],
    where: {
      userId: idUser,
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

server.get("/cart", verifyToken, (req, res) => {
  const idUser = req.userId;
  Order.findOne({
    include: [User, { model: Product, through: Orderline }],
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  })
    .then((order) => {
      if (!order) {
        return res.send({data: {products:[]}}).status(204);
      }
      return res.send({ data: order });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.post("/cart", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  let order = await Order.findOne({
    where: {
      userId: userId,
      status: "shopping_cart",
    },
  });

  if (!order)
    order = await Order.create({
      status: "shopping_cart",
      userId: userId,
    });

  let product = await Product.findByPk(productId);
  if (product.stock < quantity) return res.sendStatus(422);

  Orderline.create({
    price: product.price,
    quantity: quantity,
    productId: productId,
    orderId: order.id,
    userId: userId,
  })
    .then((orderline) => {
      product.dataValues["orderline"] = orderline;
      return res.send({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.put("/cart/:id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const productId = req.params.id;
  const quantity = req.body.quantity;

  let product = await Product.findByPk(productId);
  if (product.stock < quantity) return res.sendStatus(422);

  Orderline.findOne({
    include: [{ model: Order }],
    where: {
      userId: userId,
      productId: productId,
      "$order.status$": "shopping_cart",
    },
  })
    .then(async (orderline) => {
      if (!orderline) return res.sendStatus(404);
      orderline.quantity = quantity;
      await orderline.save();
      return res.send({ data: orderline });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.delete("/cart/:id", verifyToken, (req, res) => {
  const idUser = req.userId;
  const productId = req.params.id;

  Orderline.findOne({
    include: [
      {
        model: Order,
      },
    ],
    where: {
      "$order.userId$": idUser,
      "$order.status$": "shopping_cart",
      productId: productId,
    },
  })
    .then(async (orderline) => {
      if (!orderline) {
        return res.sendStatus(404);
      }

      await orderline.destroy();

      let _orderline = await Orderline.findOne({
        where: {
          orderId: orderline.orderId,
        },
      });
      if (!_orderline)
        await Order.destroy({
          where: {
            id: orderline.orderId,
          },
        });

      return res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.delete("/cart", verifyToken, (req, res) => {
  const userId = req.userId;

  Order.findOne({
    where: {
      userId: userId,
      status: "shopping_cart",
    },
  })
    .then(async (order) => {
      if (!order) return res.sendStatus(404);
      await order.destroy();
      return res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

//**************************************************************************************************/

//********************** RUTA QUE RETORNA EL CARRITO DEL USUARIO ***********************************/

server.get("/:idUser/cart", (req, res) => {
  const idUser = req.params.idUser;

  Order.findOne({
    include: [User, { model: Product, through: Orderline }],
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  })
    .then((order) => {
      if (!order) {
        return res.sendStatus(404);
      }
      return res.send({ data: order });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});
//***********************************************************************************************/

//********************** RUTA QUE VACIA TODOS LOS ITEMS DEL CARRITO  ****************************/
//****************** ademas controla el stock existente del producto ****************************/

server.delete("/:idUser/cart", (req, res) => {
  const idUser = req.params.idUser;

  Order.findOne({
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  }).then((order) => {
    if (!order) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }

    let orderId = order.id;

    Orderline.findAll({
      where: {
        orderId: orderId,
      },
    }).then(() => {
      Orderline.destroy({
        where: {
          orderId: orderId,
        },
      })
        .then(() => {
          return res.send("Se ha vaciado la orden");
        })
        .catch((error) => {
          return res.send(error).status(500);
        });
    });
  });
});

//**************************************************************************************************/

//********************** RUTA QUE EDITA LAS CANTIDADES DEL CARRITO  *********************************/
//****************** ademas controla el stock existente del producto ********************************/

server.put("/:idUser/cart", (req, res) => {
  const idUser = req.params.idUser;
  const { idProduct, quantityProduct } = req.body;

  Order.findOne({
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  }).then((order) => {
    if (!order) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }

    let orderId = order.id;

    Orderline.findOne({
      where: {
        productId: idProduct,
        orderId: orderId,
      },
    }).then((orderline) => {
      Product.findOne({
        where: {
          id: idProduct,
        },
      }).then((product) => {
        let stock = product.stock;
        let cantidad = orderline.quantity;
        let dif;
        if (cantidad > quantityProduct) {
          dif = cantidad - quantityProduct;
        } else {
          dif = quantityProduct - cantidad;
          if (dif > stock) {
            res.send("La cantidad pedida supera el stock existente");
            return;
          }
        }

        orderline.quantity = quantityProduct;
        orderline
          .save()
          .then((productEdited) => {
            res.send(productEdited);
          })
          .catch((error) => {
            return res.send(error).status(500);
          });
      });
    });
  });
});

//***********************************************************************************************/

//********************** RUTA QUE VACIA UN ITEM DEL CARRITO  **********************************/
//****************** Y DEVUELVE EL STOCK AL ESTADO DEL PRODUCTO ****************************/

server.delete("/:idUser/cart/:idProduct", (req, res) => {
  const idUser = req.params.idUser;
  const idProduct = req.params.idProduct;

  Order.findOne({
    where: {
      userId: idUser,
      status: "shopping_cart",
    },
  }).then((order) => {
    if (!order) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }

    let orderId = order.id;

    Orderline.findOne({
      where: {
        orderId: orderId,
      },
    }).then((orderline) => {
      if (!orderline) {
        res.send("La orden para el usuario " + idUser + ", no fue encontrada");
        return;
      }

      Product.findOne({
        where: {
          id: idProduct,
        },
      });
      Orderline.destroy({
        where: {
          productId: idProduct,
        },
      })
        .then(() => {
          return res.send("El item fue borrado");
        })
        .catch((error) => {
          return res.send(error).status(500);
        });
    });
  });
});

// Ruta que borra un usuario //

server.delete("/:id", function (req, res) {
  if (!Number.isInteger(req.params.id * 1)) {
    res
      .send({
        errors: {
          messages: ["El id del usuario es inválido"],
          status: 422,
        },
      })
      .status(422);
    return;
  }
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (rowDeleted) {
      // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        res
          .send({
            errors: { messages: ["Usuario eliminado"], status: 204 },
          })
          .status(204);
      } else {
        res
          .send({
            errors: {
              messages: ["No existe el usuario"],
              status: 404,
            },
          })
          .status(404);
      }
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

// Ruta que devuelve un usuario específico según ID //

server.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      } else {
        res
          .send({
            errors: {
              messages: ["No existe el usuario"],
              status: 404,
            },
          })
          .status(404);
      }
    })
    .catch(() => {
      return res.sendStatus(500);
    });
});

// Ruta que devuelve todas las órdenes de un usuario

server.get("/:id/allorders", (req, res) => {
  const id = req.params.id;
  Order.findAll({
    order: [["id", "ASC"]],
    where: {
      userId: id,
    },
  })
    .then((orders) => {
      return res.send({ data: orders });
    })
    .catch(() => {
      return res.status(500);
    });
});

// Ruta que devuelve orderline de usuario por id

server.get("/:id/orderline", (req, res) => {
  const id = req.params.id;

  Orderline.findAll({
    where: {
      userId: id,
    },
  })
    .then((orderline) => {
      if (!orderline) {
        return res
          .send({
            errors: { messages: ["Línea de orden no encontrada"], status: 404 },
          })
          .status(404);
      }
      res.send({ data: orderline });
    })
    .catch(() => {
      return res.sendStatus(500);
    });
});

// Ruta que devuelve todas las review de un usuario por id

server.get("/:id/reviews", (req, res) => {
  const id = req.params.id;

  Review.findAll({
    where: {
      userId: id,
    },
  })
    .then((reviews) => {
      res.send({ data: reviews });
    })
    .catch((error) => {
      res.send(error);
    });
});

// RUTA PARA BORRAR UNA REVIEW POR ID

server.delete("/reviews/:id", (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.send(200);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = server;
