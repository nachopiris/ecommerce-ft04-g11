const server = require('express').Router();	
const Sequelize = require('sequelize');	
const { User, Order} = require('../db.js');	

server.get('/', (req, res) => {	
    User.findAll({	
        attributes:['id','fullname','email', 'role', 'address','doc_number','phone','createdAt','updatedAt']	
    })	
    .then(users => {	
        return res.send({data:users}).status(201);	
    }).catch(err => {	
        var status = 500;	
        return res.send({errors: err.errors, status}).status(status);	
    });	
})	

server.post('/', (req, res) => {	
    const {fullname, email, password, role, address, doc_number, phone} = req.body;	
    User.create({fullname, email, password, role, address, doc_number, phone})	
    .then(user => {	
        return res.send({data:{id:user.id, fullname, email, role, address, doc_number, phone, createdAt: user.createdAt, updatedAt: user.updatedAt}}).status(201);	
    }).catch(err => {	
        var status = 500;	
        if (err.name === 'SequelizeValidationError') status = 422;	
        return res.send({errors: err.errors, status}).status(status);	
    });	
})

server.get('/:id/orders', (req, res) => {
    const id = req.params.id;
    
    if(!Number.isInteger(id * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!	
		return res.send({errors: [{message:'La id del usuario no es valida.'}], status:422}).status(422);	
    }

    
    User.findByPk(id, {
        include: {
            model: Order,
            through: { attributes: ['price','quantity'] }
        }
    })
    .then(user => {
        return res.send({data: user.orders}).status(200);
    })
    .catch(err => {	
        var status = 500;
        if(err.name === 'SequelizeEagerLoadingError'){
            return res.send({data: []}).status(204);
        }
        return res.send({errors: err, status}).status(status);	
    });	
})

server.put('/:id', (req, res) => {	
    const id = req.params.id;	
    const {fullname, email, password, role, address, doc_number, phone} = req.body;	

    if(!Number.isInteger(id * 1)){//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!	
		return res.send({errors: [{message:'La id del usuario no es valida.'}], status:422}).status(422);	
	}	

    User.findByPk(id).then(user => {	
        if(!user) {	
            return res.send({errors: [{message:'Usuario no encontrado'}], status: 404}).status(404);	
        }	
        user.fullname = fullname;	
        user.email = email;	
        if(password) user.password = password;	
        user.role = role;	
        user.address = address;	
        user.doc_number = doc_number;	
        user.phone = phone;	
        user.save().then(()=>{	
            return res.send({data: {id:user.id, fullname, email, role, address, doc_number, phone, createdAt: user.createdAt, updatedAt: user.updatedAt}}).status(200);	
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