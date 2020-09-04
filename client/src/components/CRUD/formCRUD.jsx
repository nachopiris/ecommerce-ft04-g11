import React, { Component } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';


class FormCRUD extends Component{

    state = {
        
        product : [],
        visible: false
    }


getItems(){
     fetch('http://localhost:3001/ruta')    // modificar cuando tengamos las rutas creadas
      .then(response => response.json())
      .then((recurso) => {
        if(recurso !== undefined){
            const prod = recurso.map( function(e) {
 
                return  { "id": e.title,
                          "name": e.title,
                          "description": e.description,
                          "prize": e.prize,
                          "imagen": e.imagen,
                          "isEditing":false
                            }
           });

          this.setState({
            prod
        });
        } 
      })
      .catch(err => console.log(err))
      }

addProduct = e => {
    e.preventDefault()
        fetch('http://localhost:3000/crud', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name : this.state.product.name,
            description : this.state.product.description,
            prize : this.state.product.prize
          })
        })
          .then(response => response.json())
          .then(item => {
            if(Array.isArray(item)) {
              this.props.addItemToState(item[0])
              this.props.toggle()
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
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : this.state.product.name,
        description : this.state.product.description,
        prize : this.state.product.prize
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
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
        product
    });
}

updateState = (i, name, description, prize) => {
    let product = this.state.product;
    product[i].title = title;
    product[i].description = description;
    product[i].prize = prize;
    product[i].isEditing = false;

    this.setState ({
        product
    })
}

deleteItemFromState = (i) => {

    let product = this.state.product.filter((u, index) => {
        return index !==i
    });
    this.setState({
        product
    })
    
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
    this.setState({
        visible: true
    })

}

listarProductos(){
    if (this.state.visible){
        return (
        <div>
        <Products allProduct = {this.state.product} pressEditBtn={this.pressEditBtn} updateProduct={this.updateProduct} pressDelete={this.pressDelete} />
        <AddProduct addProduct={this.addProduct}/>
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