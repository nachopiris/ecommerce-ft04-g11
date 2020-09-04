const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send({ data: products });
		})
		.catch(next);
});

server.post('/', (req, res) => {
	Product.create({
		name: req.body.name,
		description: req.body.description,
		stock: req.body.stock,
		price: req.body.price,
		images: JSON.stringify(req.body.images)
	})
	.then(() => {
		res.status(201).send('producto creado con exito')
	})
	.catch(() => {
		res.status(401).send('hubo un error')
	})
})

module.exports = server;
