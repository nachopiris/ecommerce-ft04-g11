import React,{ useState } from 'react';
import {updateProduct} from '../../actions/products';
import {connect} from 'react-redux';

//********************* CONECTADO AL STORE DE REDUX ***************************/
const EditProduct = ({product, setEditing, updateProduct}) => {

    
       const handleSubmit = function (e) {
            e.preventDefault();
         

            updateProduct(product.id , {
                "name": e.target.name.value,
                "description": e.target.description.value,
                "stock": e.target.stock.value,
                "price": e.target.price.value,
                "images": [e.target.images.value]
            });
        
            setEditing(false);
            window.location.reload(true);
        }


    return(
        <form className="card-header bg-dark2"onSubmit={handleSubmit}>
            <div>
                <input name="name" ref={(val) => {product.name=val}} required defaultValue={product.name} />
                <input name="description" ref={(val) => {product.description=val}} required defaultValue={product.description}  />
                <input name="stock" ref={(val) => {product.stock=val}} required defaultValue={product.stock} />
                <input name="price" ref={(val) => {product.price=val}} required defaultValue={product.price}  />
                <input name="images" ref={(val) => {product.images=val}} required defaultValue={JSON.parse(product.images)} />
                <input className="btn btn-warning btn-sm" type="submit" value="Update" />
                <button className="btn btn-danger btn-sm" onClick={()=>setEditing(false)}> Cancel </button>
            </div>
        </form>
    )


}

function mapStateToProps(state){
    return {
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateProduct: (id, attributes) => dispatch(updateProduct(id, attributes)),
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProduct);
