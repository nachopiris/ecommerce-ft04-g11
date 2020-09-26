const server = require("express").Router();
const { User, Order, Product, Orderline, Review } = require("../db.js");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
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
            user.save()
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
                    }
                    return res
                        .send({
                            data,
                        })
                        .status(200);
                })
                .catch((err) => {
                    var status = 500;
                    if (err.name === "SequelizeValidationError") status = 422;
                    return res
                        .send({ errors: err.errors, status })
                        .status(status);
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
            res.send(
                "La orden para el usuario  " + idUser + ",no fue encontrada"
            );
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
                userId: idUser
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

//**************************************************************************************************/

//********************** RUTA QUE RETORNA LOS ITEMS DEL CARRITO ***********************************/

server.get("/:idUser/cart", (req, res) => {
    const idUser = req.params.idUser;

    Order.findOne({
        where: {
            userId: idUser,
            status: "shopping_cart",
        },
    }).then((order) => {
        if (!order) {
            res.send(
                "La orden para el usuario  " + idUser + ",no fue encontrada"
            );
            return;
        }
        let orderId = order.id;
        Orderline.findAll({
            where: {
                orderId: orderId,
            },
        })
            .then((orders) => {
                if (orders[0] == null) {
                    return res.send("Ningun producto agregado a la orden");
                }
                return res.send(orders);
            })
            .catch((error) => {
                return res.sendStatus(500).send(error);
            });
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
            res.send(
                "La orden para el usuario  " + idUser + ",no fue encontrada"
            );
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
            res.send(
                "La orden para el usuario  " + idUser + ",no fue encontrada"
            );
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
                        res.send(
                            "La cantidad pedida supera el stock existente"
                        );
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
            res.send(
                "La orden para el usuario  " + idUser + ",no fue encontrada"
            );
            return;
        }

        let orderId = order.id;

        Orderline.findOne({
            where: {
                orderId: orderId,
            },
        }).then((orderline) => {
            if (!orderline) {
                res.send(
                    "La orden para el usuario " + idUser + ", no fue encontrada"
                );
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
        res.send({
            errors: {
                messages: ["El id del usuario es inválido"],
                status: 422
            },
        }).status(422);
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
                res.send({
                    errors: { messages: ["Usuario eliminado"], status: 204 },
                }).status(204);
            } else {
                res.send({
                    errors: {
                        messages: ["No existe el usuario"],
                        status: 404,
                    },
                }).status(404);
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
        .then(user => {
            if (user) {
                return res.send({ data: user });
            } else {
                res.send({
                    errors: {
                        messages: ["No existe el usuario"],
                        status: 404,
                    },
                }).status(404);
            }
        })
        .catch(() => {
            return res.sendStatus(500);
        });
});

// Ruta que devuelve todas las órdenes de un usuario

server.get('/:id/allorders', (req, res) => {
    const id = req.params.id
    Order.findAll({
        order: [["id", "ASC"]],
        where: {
            userId: id
        }
    })
        .then(orders => {
            return res.send({ data: orders });
        })
        .catch(() => {
            return res.status(500)
        });
})

// Ruta que devuelve orderline de usuario por id 

server.get('/:id/orderline', (req, res) => {
    const id = req.params.id;

    Orderline.findAll({
        where: {
            userId: id
        }
    })
        .then(orderline => {
            if (!orderline) {
                return res.send({ errors: { messages: ['Línea de orden no encontrada'], status: 404 } }).status(404);
            }
            res.send({ data: orderline });
        })
        .catch(() => {
            return res.sendStatus(500);
        })
})

// Ruta que devuelve todas las review de un usuario por id

server.get("/:id/reviews", (req, res) => {
    const id = req.params.id;

    Review.findAll({
        where: {
            userId: id
        }
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
            id: id
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