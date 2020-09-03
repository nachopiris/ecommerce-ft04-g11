import React from 'react';
// El Componente Producto es un componente presentacional y debe recibir por props los datos definidos en el modelo Productos:

// titulo
// descripcion
// precio
// cantidad

const Product = ({ name, description, price, stock}) => (
  <div>
  	<div><h2>PRODUCT</h2></div>
     <div><h3>{name}</h3></div>
     <div><h4>{description}</h4></div>
     <div>{price}</div>
     <div>{stock}</div>
  </div>
);

export default Product;