const server = require('express').Router();
const { Product, Category} = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


server.post('/:idProduct/category/:idCategory', (req, res) => {
	const {idProduct, idCategory} = req.params;

	if(!Number.isInteger(idProduct * 1)){ //multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: {messages:['El id del producto no es valido.'], status:422}}).status(422);
	}
	if(!Number.isInteger(idCategory * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: {messages:['La id de la categoría no es valido.'], status:422}}).status(422);
	}

	Product.findByPk(idProduct).then(product => {
		if(!product){
			return res.send({errors: {messages:['Producto no encontrado'], status:404}}).status(404);
		}
		Category.findByPk(idCategory).then(category => {
			if(!category){
				return res.send({errors: {messages:['Categoría no encontrada'], status:404}}).status(404);
			}
			product.addCategory(category).then(()=>{
				return res.sendStatus(201);
			});
		}).catch(err => {
			return res.sendStatus(500);
		});
	}).catch(err => {
		return res.sendStatus(500);
	});
});

server.delete('/:idProduct/category/:idCategory', (req, res) => {
	const {idProduct, idCategory} = req.params;

	if(!Number.isInteger(idProduct * 1)){ //multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: {messages:['El id del producto no es valido.'], status:422}}).status(422);
	}
	if(!Number.isInteger(idCategory * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: {messages:['La id de la categoría no es valido.'], status:422}}).status(422);
	}

	Product.findByPk(idProduct).then(product => {
		if(!product){
			return res.send({errors: {messages:['Producto no encontrado'], status:404}}).status(404);
		}
		Category.findByPk(idCategory).then(category => {
			if(!category){
				return res.send({errors: {messages:['Categoría no encontrada'], status:404}}).status(404);
			}
			product.removeCategory(category).then(() =>{
				return res.sendStatus(204);
			});
		}).catch(err => {
			return res.sendStatus(500);
		});
	}).catch(err => {
		return res.sendStatus(500);
	});
});


module.exports = server;
