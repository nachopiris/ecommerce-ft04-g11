import React,{ Component } from 'react';

const validateURl =  function(value){
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }
  
  const validateImage = function(value){
    return /(.jpg|.jpeg|.png|.webp|.gif)$/i.test(value);
  }
  

class AddProduct extends Component{

    state = {
        name: null,
        description: null,
        price: null,
        stock: null,
        image: null,
        isEditing: false
    }

handleSubmit = (e) => {
    e.preventDefault();

    if(!e.target.name.value || !e.target.description.value || !e.target.price.value || !e.target.stock.value || !e.target.image.value ){
        window.confirm('Cannot Add whit empty camps');
        return
    }else if(!validateURl(e.target.image.value) || !validateImage(e.target.image.value)){
        window.confirm('URL Image is not allowed');
        return
    }

    this.props.addProduct(this.state);
    e.target.reset();
}

updateState = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    })
}

render(){

    
    return(
        <form onSubmit={this.handleSubmit}>
            <div>
                <input name="name" autoComplete="off" placeholder="Enter a title" onChange={ this.updateState} />
                <input name="description" autoComplete="off" placeholder="Enter Description" onChange={ this.updateState} />
                <input name="stock" autoComplete="off" placeholder="Enter Stock" onChange={ this.updateState} />
                <input name="price" autoComplete="off" placeholder="Enter a price" onChange={ this.updateState} />
                <input name="image" autoComplete="off" placeholder="Enter URL image" onChange={ this.updateState} />
                <input type="submit" value="Add +" />
            </div>
        </form>
    )

}
}


export default AddProduct;


