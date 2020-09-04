const server = require('express').Router();
const { Category } = require('../db.js');
const { request } = require('../app.js');

server.post('/', (req, res, next) => {
	Category.create({
        name: req.body.name,
        description: req.body.description
    })
    .then(() => {
        res.status(201);
    })
    .catch(() => {
        res.send(401);
    });
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    if(!req.body.description) req.body.description = null;
    const {name, description} = req.body

    if(!Number.isInteger(id * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
		return res.send({errors: [{message:'La id de la categoría no es valido.'}], status:422}).status(422);
	}

    Category.findByPk(id).then(category => {
        if(!category) {
            return res.send({errors: [{message:'Categoría no encontrada'}], status: 404}).status(404);
        }
        category.name = name;
        category.description = description;
        category.save().then(()=>{
            return res.send({data: category}).status(200);
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