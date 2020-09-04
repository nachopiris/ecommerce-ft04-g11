const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send({ data: products });
		})
		.catch(next);
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    if(!req.body.description) req.body.description = null;
    const {name, description, stock, price, images} = req.body

    if(!Number.isInteger(id * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: [{message:'La id del producto no es valida.'}], status:422}).status(422);
	}

    Product.findByPk(id).then(product => {
        if(!product) {
            return res.send({errors: [{message:'Producto no encontrado'}], status: 404}).status(404);
        }
        product.name = name;
        product.stock = stock;
        product.price = price;
        product.images = JSON.stringify(images);
        product.description = description;
        product.save().then(()=>{
            return res.send({data: product}).status(200);
        }).catch(err => {
            var status = 500;
            if (err.name === 'SequelizeValidationError') status = 422;
            return res.send({errors: err.errors, status}).status(status);
        });
    }).catch(err => {
        return res.sendStatus(500);
    });
});

module.exports = server;
