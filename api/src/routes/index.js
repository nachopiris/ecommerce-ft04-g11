const { Router } = require('express');
const { Product } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
    
    Product.findAll({
        where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: query
                        }
                    },
                    {
                        description: {
                            [Op.substring]: query
                        }
                    }
                ]
            }  
        })  .then((product)=>{
            res.send(product)
            })  
    })


module.exports = router;
