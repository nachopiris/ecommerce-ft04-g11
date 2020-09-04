import React, { Component } from 'react';

class Products extends Component{

    handleUpdate = () => {
        this.props.updateProduct(this.indexNum, this.name.value, this.description.value, this.prize.value);
    }

render() {
    const {allProduct, pressEditBtn, pressDelete} = this.props;
    const productList = allProduct.map((product, index) =>{
        return product.isEditing === true ? (
            <tr key = {index}>
                <td><input type="text" ref={(val) => {this.name=val}} required defaultValue={product.name}/></td>
                <td><input type="text" ref={(val) => {this.description=val}} required defaultValue={product.description}/></td>
                <td><input type="text" ref={(val) => {this.prize=val}} required defaultValue={product.prize}/></td>
                <td>
                <input type="button" value="Update" onClick={this.handleUpdate} ref={() => {this.indexNum = index}} />
                </td>
            </tr>
        ) : (
            <tr  key={index}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.prize}</td>
                    
                    <td><button onClick={() => pressEditBtn(index)}>Edit</button>  |  <button onClick={()=>pressDelete(index)}>Delete</button></td>
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
                    <th>Prize</th>
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