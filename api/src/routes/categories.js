const server = require('express').Router();
const { Categories } = require('../db.js');

server.post('/', (req, res, next) => {
	Categories.create({
        name: req.body.name,
        description: req.body.description
    })
    .then(() => {
        res.status(201);
    })
    .catch(() => {
        res.send(400);
    });
});

module.exports = server;