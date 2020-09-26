import React from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';

function List({ products, page }) {

    return (
        <Table striped bordered hover responsive size="sm" variant="dark">
            <thead>
                <tr className="text-center">
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Categorías</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item, index) => (
                    <ItemList key={index} page={page} product={item} />
                ))}
            </tbody>
        </Table>
    )
}

export default List