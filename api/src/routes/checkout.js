const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");
const mercadopago = require("mercadopago");

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

const { User, Order, Product, Orderline } = require("../db.js");

mercadopago.configure({
  access_token:
    "APP_USR-6598461348116788-092518-7155868d5ab76566022e9a4fc6413bf0-651261130",
});

server.post("/", verifyToken, (req, res) => {
  const { token, address, phone, doc_number } = req.body;
  const { userId } = req;
  User.findByPk(userId)
    .then(async (user) => {
      if (!user) return res.sendStatus(401);
      user.address = address;
      user.phone = phone;
      user.doc_number = doc_number;
      await user.save();
      Order.findOne({
        where: {
          userId: userId,
          status: "shopping_cart",
        },
      })
        .then(async (order) => {
          if(!order) return res.sendStatus(204);
          order.status = "created";
          await order.save();


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
        to: user.email, // list of receivers
        subject: "Sobre tu pedido - OriginMaster", // Subject line
        html:
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
                <div style="width: 100%; max-width: 700px; margin: auto;">
                        <div style="background-color: #3a3a56; text-align: center; padding: 0.7rem 0;">
                            <h1 style="color: white; font-family: sans-serif; font-weight: normal;">
                                Origin<span style="color: red;">Master</span>
                            </h1>
                
                        </div>
                
                        <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
                            <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;Hola, ` +
                                user.fullname +
                                `!<br><br>
                                ¡Recibimos tu pedido! Muchas gracias por utilizar <b>OriginMaster</b>.
                                Ahora estamos a la espera del pago correspondiente. Recuerda que los precios se congelan por tiempo limitado!

                                <br /><br /></p>
                                    <a href="http://localhost:3000/cuenta" style="background-color:blue;box-sizing:border-box; padding:15px; text-decoration:none; color:white">
                                    ¡Pagar ahora!
                                    </a>
                                </div><br /><br /><br />
                                <br><br><br>
                    <div style="background-color: #cdd0d4; padding: 0.5rem; font-size: .7rem; text-align:justify;">
                        Estás recibiendo este correo porque tienes una cuenta en OriginMaster, un sitio ficticio que nunca, bajo ningún concepto, te pedirá datos personales.
                    </div>
                </div>
            </div>`, // html body
        });




        await transporter.sendMail({
            from: '"OriginMaster" <' + email_env.user + ">", // sender address
            to: "originmasterg11@gmail.com", // list of receivers
            subject: "Nueva orden - OriginMaster", // Subject line
            html:
                `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
                    <div style="width: 100%; max-width: 700px; margin: auto;">
                            <div style="background-color: #3a3a56; text-align: center; padding: 0.7rem 0;">
                                <h1 style="color: white; font-family: sans-serif; font-weight: normal;">
                                    Origin<span style="color: red;">Master</span>
                                </h1>
                    
                            </div>
                    
                            <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
                                <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">
                                   Nuevo pedido!
                                   
                                   <h3 style="text-align:left">Detalles</h3>
                                   <ul style="text-align:left">
                                    <li>Nombre completo: ${user.fullname}</li>
                                    <li>N° Documento: ${user.doc_number}</li>
                                    <li>Dirección: ${user.address}</li>
                                    <li>Teléfono / Celular: ${user.phone}</li>
                                    <li>Estado de la orden: CREADA</li>
                                   </ul>
            
                                    <br /><br /></p>
                                        <a href="http://localhost:3000/admin/ordenes" style="background-color:blue;box-sizing:border-box; padding:15px; text-decoration:none; color:white">
                                        Ir a ordenes
                                        </a>
                                    </div><br /><br /><br />
                                    <br><br><br>
                        <div style="background-color: #cdd0d4; padding: 0.5rem; font-size: .7rem; text-align:justify;">
                            Estás recibiendo este correo porque tienes una cuenta en OriginMaster, un sitio ficticio que nunca, bajo ningún concepto, te pedirá datos personales.
                        </div>
                    </div>
                </div>`, // html body
            });


          return res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

server.post("/payment", verifyToken, async (req, res) => {
  const { orderId } = req.body;
  const userId = req.userId;

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) return res.sendStatus(422);

  const order = await Order.findOne({
    include: {model: Product, through: Orderline },
    where: {id: orderId, userId: userId}
  })

  if(!order) return res.sendStatus(404)

  const items = order.products.map((product) => {
    return {
      id: product.id,
      currency_id: 'ARS',
      title: product.name,
      quantity: product.orderline.quantity,
      unit_price: parseFloat(product.orderline.price)
    }
  })

  const payer = {
    name: user.fullname.split(" ")[0],
    surname: user.fullname.split(" ").slice(1).join(" "),
    email: user.email,
    phone: {
      area_code: "",
      number: parseInt(user.phone),
    },
    identification: {
      type: "DNI",
      number: user.doc_number,
    },
    address: {
      zip_code: "",
      street_name: user.address,
      street_number: 0,
    },
  };

  const payment_methods = {
    excluded_payment_types: [{id: 'ticket'}, {id: 'atm'}, {id: 'bank_transfer'}]
  }

  const back_urls = {
    success: 'http://localhost:3000/success',
    failure: 'http://localhost:3000/failure'
  }

  const binary_mode = true

  const external_reference = `order_${orderId}`

  let preference = {
    items,
    payer,
    back_urls,
    payment_methods,
    binary_mode,
    external_reference
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.body.init_point).status(200);
    })
    .catch(function (error) {
      console.log(error)
      res.send(error).status(500);
    });
});

server.post('/process', verifyToken, (req, res) => {

  const {orderId} = req.body
  const userId = req.userId

  Order.findOne({
    include: {model: Product, through: Orderline },
    where: {id: orderId, userId: userId, status: 'created'}
  }).then(async (order) => {
    if (!order) return res.sendStatus(404)
    
    order.status = "processing";
    await order.save();
    return res.send({ order });
  }).catch((err) => {
    res.sendStatus(500)
  })
})

server.get('/failure-order/:id', verifyToken, (req, res) => {
  const orderId = req.params.id
  const userId = req.userId

  Order.findOne({
    include: {model: Product, through: Orderline },
    where: {id: orderId, userId: userId, status: 'created'}
  }).then((order) => {
    if (!order) return res.sendStatus(404)
    return res.send({ order });
  }).catch((err) => {
    res.sendStatus(500)
  })


})

module.exports = server;
