const { Router } = require('express');
const { Product } = require('../db.js');
// import all routers;
const productRouter = require('./product.js');
const categoriesRouter = require('./categories.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoriesRouter);

router.get('/search', (req,res)=>{

    const query = req.query.query;
    let filter = []

    function filtrar (product){
         product.map((e,i)=>{
            if(e.dataValues.name.indexOf(query)!==-1 || e.dataValues.description.indexOf(query)!==-1){
                filter.push(e.dataValues)
            }
         }) 
    }
    Product.findAll().then((products) => {
             filtrar(products);
    }).then(() => {
        res.send(filter);
    }) 
})

module.exports = router;
