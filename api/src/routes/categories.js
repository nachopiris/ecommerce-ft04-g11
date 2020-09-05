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

server.delete('/:id', function(req, res) {
    if (!Number.isInteger(req.params.id * 1)){
    res.status(404).send('la categoria debe ser un numero');
    return;
    }
    Category.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            res.status(204).send('ok');
            }else{
                res.status(404).send('no existe la categoria');
            }
        }, function(err){
            res.status(404).send(err);
 
        });
    });

module.exports = server;  