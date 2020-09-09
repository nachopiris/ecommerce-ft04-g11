import React,{ Component } from 'react';
import {createProduct} from '../../actions/products';
import {connect} from 'react-redux';


//***************VALIDACIONES DE URL E IMAGEN *******************************/
const validateURl =  function(value){
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }
const validateImage = function(value){
    return /(.jpg|.jpeg|.png|.webp|.gif)$/i.test(value);
  }
//****************************************************************************/

//********************* CONECTADO AL STORE DE REDUX ***************************/
export function AddProduct({createProduct}) {

   
    const handleSubmit = function (e) {
    e.preventDefault();

    //********************* VALIDACIONES DE CAMPOS NO VACIOS EN EL FORMULARIO ***************************/
        //*************!!! por validar!!!!, campos deben ser numeros para el stock y el price *************/
    if(!e.target.name.value || !e.target.description.value || !e.target.price.value || !e.target.stock.value || !e.target.image.value ){
        window.confirm('Cannot Add whit empty camps');
        return
    }else if(!validateURl(e.target.image.value) || !validateImage(e.target.image.value)){
        window.confirm('URL Image is not allowed');
        return
    }
    //***************************************************************************************************/


    //********************* LLAMADO A LA ACCION QUE CREA EL PRODUCTO ***************************/
    createProduct({
        "name": e.target.name.value,
        "description": e.target.description.value,
        "stock": e.target.stock.value,
        "price": e.target.price.value,
        "images": [e.target.image.value]
    });
    //******************************************************************************************/

    e.target.reset();
    window.location.reload(true);
}
    
    return(
        <form className="card-header bg-dark2"onSubmit={handleSubmit}>
            <div>
                <input name="name" autoComplete="off" placeholder="Enter a title"  />
                <input name="description" autoComplete="off" placeholder="Enter Description"  />
                <input name="stock" autoComplete="off" placeholder="Enter Stock" />
                <input name="price" autoComplete="off" placeholder="Enter a price"  />
                <input name="image" autoComplete="off" placeholder="Enter URL image"  />
                <input className="btn btn-warning btn-sm" type="submit" value="Add +" />
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
        createProduct: (value) => dispatch(createProduct(value)),
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProduct);


