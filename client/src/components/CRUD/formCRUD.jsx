import React, { useEffect, useState, Component  } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';
import EdditProduct from './EditProduct';
import EditProduct from './EditProduct';


const FormCRUD = () => {

  const [editing, setEditing] = useState(false);
    
  const initialFormState =  { 
                  id : '',
                  name:'',
                  description:'',
                  price:'',
                  stock:'',
                  images:'',
                  categories:'',
                
                  }

  
  const [currentProduct, setCurrentProduct] = useState(initialFormState);

  const editRow = (product) => {
      setEditing(true);
      setCurrentProduct({ id: product.id, name: product.name, description: product.description, price: product.price, stock: product.stock, images: product.images  })
   
    }

  return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h2>Productos</h2>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
            {editing ? (
                <EditProduct product={currentProduct} setEditing={setEditing}/>
            ) : (
              <AddProduct />
            )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card-header bg-dark2">
                Lista
              </div>
              <div className="card bg-dark border-0 overflow-auto">
                <div className="card-body p-0" style={{maxHeight: '400px'}}>
                   <Products  editRow={editRow}/>
                </div>
              </div>
            </div>
          </div>

        </div>
     )
  }

export default FormCRUD;