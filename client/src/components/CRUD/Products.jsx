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
                    <td><small>{product.description}</small></td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                 
                    {product.image && (
                        <td> <img  src={product.image[0]} alt="" title=""  width="60" height="80"/> </td>
                    )} 
                    <td>
                        <div className="btn-group">
                            <button className="btn btn-warning btn-sm" onClick={() => pressEditBtn(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={()=>pressDelete(product.id, index)}>Delete</button>
                        </div>
                    </td>
            </tr>
            )
    }
    );

    return(
        <div className="table-responsive">
            <table className="table table-hover table-striped table-sm table-dark">
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
        </div>
    )

}
}

export default Products;