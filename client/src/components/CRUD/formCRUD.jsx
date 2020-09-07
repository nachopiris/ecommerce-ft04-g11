import React, { Component } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';


class FormCRUD extends Component{

    state = {
        product : [],
        visible: false,
        categories: [],
        categoriesByProduct: []
    }
componentDidMount() {
  this.getItems();
  this.getCategories();
  
}

getItems(){

     fetch('http://localhost:3001/products')    // modificar cuando tengamos las rutas creadas
      .then(response => response.json())
      .then((recurso) => {
    
        if(recurso !== undefined){
            const prod = recurso.data.map( function(e) {
              var image = JSON.parse(e.images);
              return  { "id": e.id,
                        "name": e.name,
                        "description": e.description,
                        "price": e.price,
                        "stock": e.stock,
                        "image": image,
                        "categories": e.categories,
                        "isEditing":false
                          }
              });
           this.setState({
            product: prod
          });
      } 
      })
      .catch(err => console.log(err))
      }

    addProduct = e => {
      
      fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name : e.name,
          description : e.description,
          stock: JSON.parse(e.stock),
          price : JSON.parse(e.price),
          images:[e.image]       
        })
      })
        .then(response => {
          if (response.status === 201){
            this.addItemToState(e) 
           
          }
          else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
    }
      
    
addItemToState = (newProduct) => {
    let product = [...this.state.product, newProduct];
    this.setState({
        product
    });
    this.handleCLick();
}

uploadEdit = (i, name, description, stock, price, images, categories) => {
  const imagen = images.split(',');
  const modif = {
    name : name,
    description : description,
    stock: JSON.parse(stock),
    price : JSON.parse(price),
    images: imagen,
    categories: categories
  }
  
    fetch('http://localhost:3001/products/'+i, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modif)
    })
    .then(response => {
      if (response.status === 200){
        this.addItemToState(modif) 
      }
      else {
        console.log('failure')
      }
    })
    .catch(err => console.log(err))
}

pressEditBtn = (i) => {
    let product = this.state.product;
    product[i].isEditing = true;
    this.setState({
      product: product
    });
}

updateState = (i, name, description, stock, price) => {
    let product = this.state.product;
    product[i].id = i;
    product[i].name = name;
    product[i].description = description;
    product[i].stock = stock;
    product[i].price = price;
    product[i].isEditing = false;

    this.setState({
      product: product
    });
}

pressDelete = (id,index) => {
    let confirmDelete = window.confirm('Delete item?')
    
   if(confirmDelete){
      fetch('http://localhost:3001/products/'+id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      console.log(response);
      if (response.status === 200){
        this.deleteItemFromState(index);  

      }
      else {
        console.log('failure')
      }
    })
    .catch(err => console.log(err))
    }
}

deleteItemFromState = (id) => {

  let product = this.state.product.filter(index => index == id)
  this.setState({
    product
  });
  this.handleCLick();

}

handleCLick = () => {
    this.getItems();
    this.setState({
        visible: true
    })

}

// ************* FUNCIONES DE EDICION DE CATEGORIAS **************************

getCategories = () => {

  fetch('http://localhost:3001/categories')    // modificar cuando tengamos las rutas creadas
   .then(response => response.json())
   .then((recurso) => {
    
     if(recurso !== undefined){
         const cats = recurso.data.map( function(e) {
           return  { "id": e.id,
                     "name": e.name,
                     "description": e.description
                    }
           });
        this.setState({
         categories: cats
       });
   } 
   })
   .catch(err => console.log(err))
   }


pressAddCatBtn = (idCat, idProduct) => {

    fetch('http://localhost:3001/products/'+idProduct+'/category/'+idCat, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })   
    .then(()=>{ window.confirm('Added Category') })
    .then(()=>{  window.location.reload(true) })
    .catch(()=>{
        return Error;
    })

}


getCategoriesByProduct = (idproduct) => {

  fetch('http://localhost:3001/products/categories/'+idproduct)
      .then(response => response.json())
        
      .then((recurso) => {
        this.setState({
          categoriesByProduct: recurso
      })
      console.log(recurso) }) 
    .catch(()=>{
        return Error;
    })

}


pressDelCatBtn = (idCat, idProduct) => {

  fetch('http://localhost:3001/products/'+idProduct+'/category/'+idCat, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })   
    .then(()=>{ window.confirm('Category Deleted') })
    .then(()=>{window.location.reload(true)})
    .catch(()=>{
        return Error;
    })

}


render(){

    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h2>Productos</h2>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <AddProduct addProduct={this.addProduct}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card-header bg-dark2">
                Lista
              </div>
              <div className="card bg-dark border-0 overflow-auto">
                <div className="card-body p-0" style={{maxHeight: '400px'}}>
                  {this.state.product.length && <Products allProduct = {this.state.product} allcategories = {this.state.categories} pressEditBtn={this.pressEditBtn} uploadEdit={this.uploadEdit} pressDelete={this.pressDelete} 
                          pressAddCatBtn={this.pressAddCatBtn} pressDelCatBtn={this.pressDelCatBtn} 
                          categoriesByProduct = {this.state.categoriesByProduct} getCategoriesByProduct={this.getCategoriesByProduct}
                  />}
                </div>
              </div>
            </div>
          </div>
        
                  
        </div>
    )
 }
}

export default FormCRUD;