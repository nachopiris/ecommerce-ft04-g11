const server = require('express').Router();
const { Product, Category} = require('../db.js');

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