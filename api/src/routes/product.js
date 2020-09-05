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

server.delete('/:id', function(req, res) {
    if (!Number.isInteger(req.params.id * 1)){
    res.status(404).send('la categoria debe ser un numero');
    return;
    }
    Product.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            res.status(200).send('ok');
            }else{
                res.status(404).send('no existe el producto');
            }
        }, function(err){
            res.status(404).send(err);
 
        });
    });

module.exports = server;