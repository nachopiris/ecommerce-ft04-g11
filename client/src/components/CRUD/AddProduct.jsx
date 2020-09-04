server.get('/products/category/:nombreCat', function(req, res, next) {
  
    Category.findOne({
        where: {
          name: req.params.nombreCat
        }
      })
    .then(function(categories){
        if(!categories){
            var err = new Error ('La categoria no se encuentra');
            res.status(404).send(err);
          } else {
            return Product.findAll({
                include: [{model: Category}] , 
                where:{
                    id: categories.Id, 
                }
                
            })
          }
    })    
    .then(function(products){
          res.status(200).send({data: products});
        })
    
    });