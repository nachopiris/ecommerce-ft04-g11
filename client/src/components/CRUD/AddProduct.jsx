import React,{ Component } from 'react';

class AddProduct extends Component{

    state = {
        name: null,
        description: null,
        price: null,
        isEditing: false
    }

handleSubmit = (e) => {
  console.log('props',this.props)
  console.log('state',this.state)
    e.preventDefault();
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
                <input type="submit" value="Add +" />
            </div>
        </form>
    )

}
}


export default AddProduct;


