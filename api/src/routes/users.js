const server = require('express').Router();	
const Sequelize = require('sequelize');	
const { User, Order, Product, Orderline} = require('../db.js');	
const OrderLine = require('../models/OrderLine.js');

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



//******************* RUTA PARA AGREGAR ITEMS AL CARRITO ***************************/
//*********** ademas controla el stock existente del producto **********************/
server.post('/:idUser/cart', (req, res) => {

    const idUser = req.params.idUser;
    const {idProduct, priceProduct, quantityProduct} = req.body; 
    
    Order.findOne({
        where: {
            userId: idUser,
            status: "shopping_cart"
        }
    }).then(order => {
            
            if (!order){
                res.send("La orden para el usuario  " + idUser + ",no fue encontrada") 
                return;
            }
            let orderId = order.id;

            Product.findOne({
                where: {
                    id: idProduct
                }
            }).then((product)=>{
                let stock = product.stock;

                if(quantityProduct > stock){
                    res.send("La cantidad pedida supera el stock existente");
                    return
                }
                product.stock = stock - quantityProduct;

                    Orderline.create({
                        price: priceProduct,
                        quantity: quantityProduct,
                        productId: idProduct,
                        orderId: orderId
                
                    }).then((orderCreated)=>{
                        product.save();
                        return res.send(orderCreated).sendStatus(200); 
                    }).catch(err => {	
                        var status = 500;		
                        return res.send("Este producto ya fue agregado a la orden").status(status);
                    }); 
               
            })


                
        });
})

//**************************************************************************************************/


//********************** RUTA QUE RETORNA LOS ITEMS DEL CARRITO ***********************************/

server.get('/:idUser/cart', (req, res) => {

    const idUser = req.params.idUser;
        
    Order.findOne({
        where: {
            userId: idUser,
            status: "shopping_cart"
        }
    }).then ((order) =>{

        if (!order){
            res.send("La orden para el usuario  " + idUser + ",no fue encontrada") 
            return;
        }
        let orderId = order.id;
        Orderline.findAll({
            where:{
                orderId: orderId
            }
        }).then((orders)=>{
            if(orders[0] == null){
                return res.send("Ningun producto agregado a la orden");
            }
            return res.send(orders);
        }).cath(error =>{
            return res.sendStatus(500).send(error);
        })
    })
});
//***********************************************************************************************/

//********************** RUTA QUE VACIA TODOS LOS ITEMS DEL CARRITO  ****************************/
//****************** ademas controla el stock existente del producto ****************************/

server.delete('/:idUser/cart', (req, res) => {

    const idUser = req.params.idUser;
        
    Order.findOne({
        where: {
            userId: idUser,
            status: "shopping_cart"
        }
    }).then((order)=>{

        if (!order){
            res.send("La orden para el usuario  " + idUser + ",no fue encontrada") 
            return;
        }

        let orderId = order.id;
        let idsproducts = [];
        let cantidades = [];

        Orderline.findAll({
                where:{
                    orderId: orderId
                }
        }).then((products)=>{
           
          products.map(product =>{
              idsproducts.push(product.dataValues.productId);
              cantidades.push(product.dataValues.quantity);
           })
           
           idsproducts.map((idproduct, index) =>{
                Product.findOne({
                    where:{
                        id: idproduct
                    }
                }).then((producto)=>{

                    producto.stock += cantidades[index];
                    producto.save();
                })
           })
                Orderline.destroy({
                    where: {
                        orderId: orderId
                    }
                }).then(()=>{
                        return res.send("Se ha vaciado la orden");
                }).catch(error =>{
                    return res.send(error).status(500);
                })
        })
    })

});

//**************************************************************************************************/

//********************** RUTA QUE EDITA LAS CANTIDADES DEL CARRITO  *********************************/
//****************** ademas controla el stock existente del producto ********************************/

server.put('/:idUser/cart', (req, res) => {

    const idUser = req.params.idUser;
    const {idProduct, quantityProduct} = req.body; 
        
    Order.findOne({
        where: {
            userId: idUser,
            status: "shopping_cart"
        }
    }).then((order)=>{

        if (!order){
            res.send("La orden para el usuario  " + idUser + ",no fue encontrada") 
            return;
        }

        let orderId = order.id;
        
        Orderline.findOne({  where: {
            productId: idProduct,
            orderId: orderId
             }
       }).then((orderline) =>{

            Product.findOne({
                where: {
                    id: idProduct
                }
            }).then((product)=>{
                
                let stock = product.stock;
                let cantidad = orderline.quantity;
                let dif; 
                if(cantidad > quantityProduct){
                    dif = cantidad - quantityProduct;
                    product.stock = stock + dif;
                }else{
                    dif = quantityProduct - cantidad;
                    if(dif > stock){
                        res.send("La cantidad pedida supera el stock existente");
                        return;
                    }
                    product.stock = stock - dif;
                }
               
                product.save()

                orderline.quantity = quantityProduct;
                orderline.save().then((productEdited)=>{
                        res.send(productEdited); 
                }).catch(error =>{
                    return res.send(error).status(500);
                })   

           })

        })   
    })
});


//***********************************************************************************************/

//********************** RUTA QUE VACIA UN ITEM DEL CARRITO  **********************************/
//****************** Y DEVUELVE EL STOCK AL ESTADO DEL PRODUCTO ****************************/

server.delete('/:idUser/cart/:idOrderLine', (req, res) => {

    const idUser = req.params.idUser;
    const idOrderLine = req.params.idOrderLine

        
    Orderline.findOne({
        where: {
            id: idOrderLine,
        }
    }).then((orderline)=>{

        if (!orderline){
            res.send("La orden para el usuario " + idUser + ", no fue encontrada") 
            return;
        }

        let cantidad = orderline.quantity;
        let idProd = orderline.productId;

        Product.findOne({
            where:{
                id: idProd
            }
        }).then((producto)=>{
            producto.stock += cantidad;
            producto.save();
        })
                Orderline.destroy({
                    where: {
                        id: idOrderLine
                    }
                }).then(()=>{
                        return res.send("El item fue borrado");
                }).catch(error =>{
                    return res.send(error).status(500);
                })
        }) 
    });

module.exports = server; 