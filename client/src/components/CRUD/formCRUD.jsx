import React, { Component } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';


class FormCRUD extends Component{

    state = {
        
        product : [],
        visible: false
    }


getItems(){
  console.log('aqui');
     fetch('http://localhost:3001/products')    // modificar cuando tengamos las rutas creadas
      .then(response => response.json())
      .then((recurso) => {
        console.log('recurso', recurso);

        if(recurso !== undefined){
            const prod = recurso.map( function(e) {
                return  { "id": e.id,
                          "name": e.name,
                          "description": e.description,
                          "price": e.price,
                          "stock": e.stock,
                          "imagen": e.imagen,
                          "isEditing":false
                            }
           });
           console.log('prod', prod);

           this.setState({
            product: prod
          });
        console.log('state', this.state);
      } 
      })
      .catch(err => console.log(err))
      }
    //   // ----------
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title: 'React POST Request Example' })
    // };
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));

addProduct = e => {
        console.log('add product', e);
        fetch('http://localhost:3001/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name : e.name,
            description : e.description,
            stock: 12,
            price : 10,
            images: ["https://url.com/example.jpg", "https://url.com/example.jpg"]
          })
        })
          .then(response => {
            console.log(response);
            response.json()})
          .then(item => {
            console.log('item----',item);
            if(Array.isArray(item)) {
              this.addItemToState(e);
              
            } else {
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
}

uploadEdit = e => {
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : this.state.product.name,
        description : this.state.product.description,
        price : this.state.product.price
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.updateState(item[0])
         
        } else {
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

deleteItemFromState = (i) => {

    let product = this.state.product.filter((u, index) => {
        return index !==i
    });
    this.setState({
      product: product
    });
    
}

pressDelete = (i) => {
    let confirmDelete = window.confirm('Delete item?')
    if(confirmDelete){
      fetch('http://localhost:3001/ruta', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        i
      })
    })
      .then(response => response.json())
      .then(item => {
        this.deleteItemFromState(i)
      })
      .catch(err => console.log(err))
    }
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
        <Products allProduct = {this.state.product} pressEditBtn={this.pressEditBtn} uploadEdit={this.uploadEdit} pressDelete={this.pressDelete} />
        <AddProduct addProduct={this.addProduct}/>
        </div>
        )}

}

render(){
  console.log(this.state.product);
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