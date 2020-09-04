const server = require('express').Router();
const { Category } = require('../db.js');

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

module.exports = server;