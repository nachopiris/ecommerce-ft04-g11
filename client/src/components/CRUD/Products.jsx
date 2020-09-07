import React, { Component } from 'react';

var IdCat;

class Products extends Component{

    handleUpdate = () => {
        this.props.uploadEdit(this.indexNum, this.name.value, this.description.value, this.stock.value, this.price.value, this.image.value, this.categories);
    }

    componentDidMount(){
        console.log(this.props.allProduct);
    }

    sendCatId = (e) =>{
        IdCat = e.target.value;
    }

    handleCancel = () => {
        this.props.allProduct.map(e => e.isEditing = false);
    }
    

    componentDidUpdate(){
        this.handleCancel();
    }

render() {
    const {allProduct, allcategories, pressEditBtn, pressDelete, pressAddCatBtn, pressDelCatBtn, getCategoriesByProduct, categoriesByProduct , pressCancelBtn} = this.props;
    
    const categorieslistexistin = allcategories.map(cat => {
        return  (
            <option key={cat.id} value={cat.id}> {cat.name} </option> 
            )
    })

    const categorieslistbyproduct = categoriesByProduct.map(cat => {
        return (
            <option key={cat.id} value={cat.id}> {cat.name} </option>
        )
    })

    const productList = allProduct.map((product, index) =>{


        return product.isEditing === true ? (
            <tr key = {index}>
                <td><input type="text" ref={(val) => {this.name=val}} required defaultValue={product.name}/></td>
                <td><input type="text" ref={(val) => {this.description=val}} required defaultValue={product.description}/></td>
                <td><input type="text" ref={(val) => {this.stock=val}} required defaultValue={product.stock}/></td>
                <td><input type="text" ref={(val) => {this.price=val}} required defaultValue={product.price}/></td>
                <td><input type="text" ref={(val) => {this.image=val}} required defaultValue={product.image}/></td>
                <td>
                <div className="btn-group">
                    <input className="btn btn-warning btn-sm" type="button" value="Update" onClick={this.handleUpdate} ref={() => {this.indexNum = product.id}} />
                    <button className="btn btn-danger btn-sm" onClick={()=>pressCancelBtn(index)}>Cancel</button>
                </div>
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
                    <td className="text-center">
                            <select className="form-control form-control-sm mb-1" onChange={this.sendCatId} > <option>Seleccionar</option> {categorieslistexistin} </select> 
                            <button className="btn btn-outline-light btn-block btn-sm mb-1" onClick={() => pressAddCatBtn(IdCat, product.id) }>Añadir</button>                         
                           
                            {(product.categories.length && product.categories.map((cat, index) => (
                            <span className="pl-3 badge m-1 badge-dark2 badge-sm badge-pill">
                                {cat.name}
                                <button onClick={() => pressDelCatBtn(cat.id, product.id)} className="btn btn-outline-light btn-sm border-0">&times;</button>
                            </span>
                        ))) || (<small><em>Sin categorías</em></small>)}
                    </td> 
                   
            </tr>
            )
    }
    );

    return(
        <div className="table-responsive" >
            <table className="table table-hover table-striped table-sm table-dark">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Image</th>
                        <th>Acción</th>
                        <th>Categorías</th>
           
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