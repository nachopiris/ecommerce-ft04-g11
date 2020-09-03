const server = require('express').Router();
const { Category } = require('../models/Category');

// DELETE /products/category/:id

server.delete('/products/category/:id', function(req, res, next) {

    Category.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            res.status(200).send('Delete successfully');;
            }
        }, function(err){
            res.status(404).send(err);
 
        });
    });