import React, { Component } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';


class FormCRUD extends Component{

    state = {
        product : [],
        visible: false
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

uploadEdit = (i, name, description, stock, price, images) => {
  const imagen = images.split(',');
  const modif = {
    name : name,
    description : description,
    stock: JSON.parse(stock),
    price : JSON.parse(price),
    images: imagen
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

listarProductos(){
    if (this.state.visible){
        return (
        <div>
        <AddProduct addProduct={this.addProduct}/>
        <Products allProduct = {this.state.product} pressEditBtn={this.pressEditBtn} uploadEdit={this.uploadEdit} pressDelete={this.pressDelete} />
         
        </div>
        )}

}

render(){

    return(
        <div>
        <h2>Product List</h2>
        <button onClick={this.handleCLick} visible = {true}>List</button>
        {this.listarProductos()}

        </div>
    )
 }
}

export default FormCRUD;