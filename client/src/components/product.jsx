import React from 'react';
// El Componente Producto es un componente presentacional y debe recibir por props los datos definidos en el modelo Productos:

// titulo
// descripcion
// precio
// cantidad

const Product = ({ titulo, description, price, stock}) => (
  <div>
  	<div><h2>PRODUCTO</h2></div>
     <div><h3>{titulo}</h3></div>
     <div><h4>{description}</h4></div>
     <div>{price}</div>
     <div>{stock}</div>
  </div>
);

export default Product;