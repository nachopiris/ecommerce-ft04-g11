const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send({ data: products });
		})
		.catch(next);
});

server.get('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
		.then(product => {
			if(!product){
				return res.send({errors: {messages:['Producto no encontrado'], status:404}}).status(404);
			}
			res.send({ data: product });
		})
		.catch(next);
});

module.exports = server;