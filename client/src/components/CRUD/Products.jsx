import React, { Component } from 'react';

class Products extends Component{

    handleUpdate = () => {
        this.props.uploadEdit(this.indexNum, this.name.value, this.description.value, this.stock.value, this.price.value, this.image.value);
    }


render() {
    const {allProduct, pressEditBtn, pressDelete} = this.props;
    
    const productList = allProduct.map((product, index) =>{

        return product.isEditing === true ? (
            <tr key = {index}>
                <td><input type="text" ref={(val) => {this.name=val}} required defaultValue={product.name}/></td>
                <td><input type="text" ref={(val) => {this.description=val}} required defaultValue={product.description}/></td>
                <td><input type="text" ref={(val) => {this.stock=val}} required defaultValue={product.stock}/></td>
                <td><input type="text" ref={(val) => {this.price=val}} required defaultValue={product.price}/></td>
                <td><input type="text" ref={(val) => {this.image=val}} required defaultValue={product.image}/></td>
                <td>
                <input type="button" value="Update" onClick={this.handleUpdate} ref={() => {this.indexNum = product.id}} />
                </td>
            </tr>
        ) : (
            <tr  key={index}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                 
                    {product.image && (
                        <td> <img  src={product.image[0]} alt="" title=""  width="60" height="80"/> </td>
                    )} 
                    <td><button onClick={() => pressEditBtn(index)}>Edit</button>  |  <button onClick={()=>pressDelete(product.id, index)}>Delete</button></td>
            </tr>
            )
    }
    );

    return(
        <table >
            <thead>
            <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                    </tr>
            </thead>
            <tbody>
                    {productList}
                </tbody>
        </table>
    )

}
}

export default Products;